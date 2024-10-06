package com.rkisuru.book.feedback;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("feedbacks")
@RequiredArgsConstructor
@Tag(name = "Feedback")
public class FeedbackController {

    private final FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<Integer> saveFeedback(
            @Valid @RequestBody FeedbackRequest feedbackRequest,
            Authentication connectedUser,
            @AuthenticationPrincipal Jwt jwt) {
        return ResponseEntity.ok(feedbackService.save(feedbackRequest, connectedUser, jwt));
    }

    @GetMapping("/book/{book-id}")
    public ResponseEntity<List<FeedbackResponse>> findAllFeedbacksByBook(
            @PathVariable("book-id") Integer bookId)
    {
        return ResponseEntity.ok(feedbackService.findAllFeedbacksByBookId(bookId));
    }

}
