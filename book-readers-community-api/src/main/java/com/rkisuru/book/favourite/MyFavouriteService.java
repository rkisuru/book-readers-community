package com.rkisuru.book.favourite;

import com.rkisuru.book.book.Book;
import com.rkisuru.book.book.BookMapper;
import com.rkisuru.book.book.BookRepository;
import com.rkisuru.book.book.BookResponse;
import com.rkisuru.book.exception.OperationNotPermittedException;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MyFavouriteService {

    private final MyFavouriteRepository repository;
    private final BookRepository bookRepository;
    private final BookMapper bookMapper;

    public Integer addToFavourites(Authentication connectedUser, Integer bookId) {

        Book book = bookRepository.findById(bookId)
                .orElseThrow(()-> new EntityNotFoundException("Book not found"));

        Optional<MyFavourite> optFav = repository.findByBookIdUserId(bookId, connectedUser.getName());
        if (optFav.isPresent()) {
            throw new EntityExistsException("Book already exists for the user");
        }
        if (book.getCreatedBy().equals(connectedUser.getName())) {
            throw new RuntimeException("You cannot add your own book to favourite list");
        }
        MyFavourite favourite = new MyFavourite();
        favourite.setBook(book);
        favourite.setCreatedBy(connectedUser.getName());
        return repository.save(favourite).getId();
    }

    public void removeFromFavourites(Authentication connectedUser, Integer favId) {

        MyFavourite fav = repository.findById(favId)
                .orElseThrow(()-> new EntityNotFoundException("Favourite not found"));

        if (fav.getCreatedBy().equals(connectedUser.getName())) {
            repository.delete(fav);
        }
    }

    public List<BookResponse> getAllFavourites(Authentication connectedUser) {

        List<MyFavourite> favs = repository.findByConnectedUser(connectedUser.getName());
        List<Book> books = new ArrayList<>();
        for (MyFavourite fav : favs) {
            books.add(fav.getBook());
        }
        return books.stream()
                .map(bookMapper::toBookResponse)
                .toList();
    }
}
