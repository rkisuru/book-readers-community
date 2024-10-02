package com.rkisuru.book.favourite;

import com.rkisuru.book.book.Book;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MyFavourite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    @CreatedBy
    @Column(nullable = false, updatable = false)
    private String createdBy;
}
