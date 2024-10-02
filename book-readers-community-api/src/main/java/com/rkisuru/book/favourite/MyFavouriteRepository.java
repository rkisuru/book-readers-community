package com.rkisuru.book.favourite;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MyFavouriteRepository extends JpaRepository<MyFavourite, Integer> {

    @Query("SELECT fav FROM MyFavourite fav WHERE fav.book.id = :bookId AND fav.createdBy = :connectedUser")
    Optional<MyFavourite> findByBookIdUserId(@Param("bookId") Integer bookId, @Param("connectedUser") String connectedUser);
}
