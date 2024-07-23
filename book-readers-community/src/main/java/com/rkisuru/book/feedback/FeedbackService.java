package com.rkisuru.book.feedback;

import com.rkisuru.book.book.Book;
import com.rkisuru.book.book.BookRepository;
import com.rkisuru.book.exception.OperationNotPermittedException;
import com.rkisuru.book.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final BookRepository bookRepository;
    private final FeedbackMapper feedbackMapper;
    private final FeedbackRepository feedbackRepository;

    public Integer save(FeedbackRequest feedbackRequest, Authentication connectedUser) {
        Book book = bookRepository.findById(feedbackRequest.bookId())
                .orElseThrow(()-> new EntityNotFoundException("No book found with id " + feedbackRequest.bookId()));
        if (book.isArchived() || !book.isShareable()) {
            throw new SecurityException("You cannot give feedback to an archived or not shareable book");
        }
        User user = ((User) connectedUser.getPrincipal());
        if (Objects.equals(book.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot give feedback to your own book");
        }
        Feedback feedback = feedbackMapper.toFeedback(feedbackRequest);
        return feedbackRepository.save(feedback).getId();
    }
}
