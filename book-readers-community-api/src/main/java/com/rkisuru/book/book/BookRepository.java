package com.rkisuru.book.book;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Integer>, JpaSpecificationExecutor<Book> {

    @Query("""
            SELECT book
            FROM Book book
            WHERE book.archived = false
            AND book.shareable = true
            AND book.createdBy != :userId
            """)
    Page<Book> findAllDisplayableBooks(Pageable pageable, String userId);

    @Query("SELECT books FROM Book books WHERE books.title LIKE %:title%")
    Page<Book> searchBookByTitle(@Param("title") String title, Pageable pageable);
}
