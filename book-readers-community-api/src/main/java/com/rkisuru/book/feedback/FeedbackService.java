package com.rkisuru.book.feedback;

import com.rkisuru.book.book.Book;
import com.rkisuru.book.book.BookRepository;
import com.rkisuru.book.exception.OperationNotPermittedException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final BookRepository bookRepository;
    private final FeedbackMapper feedbackMapper;
    private final FeedbackRepository feedbackRepository;

    public Integer save(FeedbackRequest feedbackRequest, Authentication connectedUser, @AuthenticationPrincipal Jwt jwt) {
        Book book = bookRepository.findById(feedbackRequest.bookId())
                .orElseThrow(()-> new EntityNotFoundException("No book found with id " + feedbackRequest.bookId()));
        if (book.isArchived() || !book.isShareable()) {
            throw new SecurityException("You cannot give feedback to an archived or not shareable book");
        }
        if (Objects.equals(book.getCreatedBy(), connectedUser.getName())) {
            throw new OperationNotPermittedException("You cannot give feedback to your own book");
        }

        String username = jwt.getClaimAsString("preferred_username");
        Feedback feedback = feedbackMapper.toFeedback(feedbackRequest);
        feedback.setOwn(username);
        return feedbackRepository.save(feedback).getId();
    }

    public List<FeedbackResponse> findAllFeedbacksByBookId(Integer bookId) {

        return feedbackRepository.findAllByBookId(bookId).stream()
                .map(feedbackMapper::toFeedbackResponse)
                .toList();
    }

}
