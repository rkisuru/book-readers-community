package com.rkisuru.book.feedback;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {

    @Query("SELECT feedbacks FROM Feedback feedbacks WHERE feedbacks.book.id = :bookId")
    List<Feedback> findAllByBookId(@Param("bookId") Integer bookId);
}
