package com.rkisuru.book.favourite;

import com.rkisuru.book.book.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MyFavouriteRepository extends JpaRepository<MyFavourite, Integer> {

    @Query("SELECT fav FROM MyFavourite fav WHERE fav.book.id = :bookId AND fav.createdBy = :connectedUser")
    Optional<MyFavourite> findByBookIdUserId(@Param("bookId") Integer bookId, @Param("connectedUser") String connectedUser);

    @Query("SELECT favs FROM MyFavourite favs WHERE favs.createdBy = :connectedUser")
    List<MyFavourite> findByConnectedUser(@Param("connectedUser") String connectedUser);

    @Query("SELECT favs FROM MyFavourite favs WHERE favs.book.id = :bookId")
    List<MyFavourite> findByBookId(@Param("bookId") Integer bookId);
}
