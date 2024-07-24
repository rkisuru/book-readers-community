package com.rkisuru.book.history;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface BookTransactionHistoryRepository extends JpaRepository<BookTransactionHistory, Integer> {

    @Query("""
            SELECT history
            FROM BookTransactionHistory history
            WHERE history.user.id = :user_id
            """)
    Page<BookTransactionHistory> findAllBorrowedBooks(Pageable pageable, Integer user_id);

    @Query("""
            SELECT history
            FROM BookTransactionHistory history
            WHERE history.book.owner.id = :user_id
            """)
    Page<BookTransactionHistory> findAllReturnedBooks(Pageable pageable, Integer user_id);

    @Query("""
            SELECT
            (COUNT(*) > 0) AS isBorrowed
            FROM BookTransactionHistory bookTransactionHistory
            WHERE bookTransactionHistory.user.id = :user_id
            AND bookTransactionHistory.book.id = :book_id
            AND bookTransactionHistory.returnApproved = false
            """)
    boolean isAlreadyBorrowed(Integer book_id, Integer user_id);

    @Query("""
            SELECT transaction
            FROM BookTransactionHistory transaction
            WHERE transaction.user.id = :user_id
            AND transaction.book.id = :book_id
            AND transaction.returned = false
            AND transaction.returnApproved = false
            """)
    Optional<BookTransactionHistory> findByBookIdAndUserId(Integer book_id, Integer user_id);

    @Query("""
    SELECT transaction
    FROM BookTransactionHistory transaction
    WHERE transaction.book.owner.id = :user_id
    AND transaction.book.id = :book_id
    AND transaction.returned = true
    AND transaction.returnApproved = false
    """)
    Optional<BookTransactionHistory> findByBookIdAndOwnerId(Integer book_id, Integer user_id);
}
