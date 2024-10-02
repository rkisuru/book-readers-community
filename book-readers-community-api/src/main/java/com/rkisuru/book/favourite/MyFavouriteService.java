package com.rkisuru.book.favourite;

import com.rkisuru.book.book.Book;
import com.rkisuru.book.book.BookRepository;
import com.rkisuru.book.exception.OperationNotPermittedException;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MyFavouriteService {

    private final MyFavouriteRepository repository;
    private final BookRepository bookRepository;

    public Integer addToWishList(Authentication connectedUser, Integer bookId) {

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

    public String removeFromWishList(Authentication connectedUser, Integer favId) {

        MyFavourite fav = repository.findById(favId)
                .orElseThrow(()-> new EntityNotFoundException("Favourite not found"));

        if (fav.getCreatedBy().equals(connectedUser.getName())) {
            repository.delete(fav);
            return "Favourite removed";
        }
        throw new OperationNotPermittedException("You cannot remove other favourites from favourite list");
    }
}