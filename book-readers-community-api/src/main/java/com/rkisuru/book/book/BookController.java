package com.rkisuru.book.book;

import com.rkisuru.book.common.PageResponse;
import com.rkisuru.book.favourite.MyFavouriteService;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("books")
@RequiredArgsConstructor
@Tag(name = "book")
public class BookController {

    private final BookService bookService;

    private final MyFavouriteService favouriteService;

    @PostMapping
    public ResponseEntity<Integer> saveBook(
            @Valid @RequestBody BookRequest request,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(bookService.save(request, connectedUser));
    }

    @GetMapping("/{bookId}")
    public ResponseEntity<BookResponse> findBookById(
            @PathVariable Integer bookId
    ){
        return ResponseEntity.ok(bookService.findById(bookId));
    }

    @GetMapping
    public ResponseEntity<PageResponse<BookResponse>> findAllBooks(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(bookService.findAllBooks(page, size, connectedUser));
    }

    @GetMapping("/owner")
    public ResponseEntity<PageResponse<BookResponse>> findAllBooksByOwner(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(bookService.findAllBooksByOwner(page, size, connectedUser));
    }

    @GetMapping("/borrowed")
    public ResponseEntity<PageResponse<BorrowedBookResponse>> findAllBorrowedBooks(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(bookService.findAllBorrowedBooks(page, size, connectedUser));
    }

    @GetMapping("/returned")
    public ResponseEntity<PageResponse<BorrowedBookResponse>> findAllReturnedBooks(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(bookService.findAllReturnedBooks(page, size, connectedUser));
    }

    @PatchMapping("/shareable/{book-id}")
    public ResponseEntity<Integer> updateShareableStatus(
            @PathVariable("book-id") Integer bookId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(bookService.updateShareableStatus(bookId, connectedUser));
    }

    @PatchMapping("/archived/{book-id}")
    public ResponseEntity<Integer> updateArchivedStatus(
            @PathVariable("book-id") Integer bookId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(bookService.updateArchivedStatus(bookId, connectedUser));
    }

    @PostMapping("/borrow/{book-id}")
    public ResponseEntity<Integer> borrowBook(
            @PathVariable("book-id") Integer bookId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(bookService.borrowBook(bookId, connectedUser));
    }

    @PatchMapping("/borrow/return/{book-id}")
    public ResponseEntity<Integer> returnBorrowedBook(
            @PathVariable("book-id") Integer bookId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(bookService.returnBorrowedBook(bookId, connectedUser));
    }

    @PatchMapping("/borrow/return/approve/{book-id}")
    public ResponseEntity<Integer> approveReturnBorrowedBook(
            @PathVariable("book-id") Integer bookId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(bookService.approveReturnBorrowedBook(bookId, connectedUser));
    }

    @PostMapping(value = "/cover/{book-id}", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadBookCoverPic(
            @PathVariable("book-id") Integer bookId,
            @Parameter()
            @RequestPart("file") MultipartFile file,
            Authentication connectedUser
            ) {
        bookService.uploadBookCoverPic(file, connectedUser, bookId);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/search")
    public ResponseEntity<List<BookResponse>> searchBook(@RequestParam String keyword) {

        return ResponseEntity.ok(bookService.searchBook(keyword));
    }

    @DeleteMapping("/{bookId}")
    public ResponseEntity<Map<String, String>> deleteBook(@PathVariable("bookId") Integer bookId, Authentication connectedUser) {

        bookService.deleteBook(bookId, connectedUser);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Book deleted successfully!");
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }

    @PostMapping("/{bookId}/favourites")
    public ResponseEntity<Integer> addToFavourites(@PathVariable Integer bookId, Authentication connectedUser) {

        return ResponseEntity.ok(favouriteService.addToFavourites(connectedUser, bookId));
    }

    @DeleteMapping("/favourites/{bookId}")
    public ResponseEntity<Map<String, String>> removeFromFavourites(@PathVariable Integer bookId, Authentication connectedUser) {

        favouriteService.removeFromFavourites(connectedUser, bookId);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Favourite removed successfully!");
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }

    @GetMapping("/favorites")
    public ResponseEntity<List<BookResponse>> getFavorites(Authentication connectedUser) {

        return ResponseEntity.ok(favouriteService.getAllFavourites(connectedUser));
    }

    @GetMapping("/favourites/{bookId}")
    public ResponseEntity<Boolean> isFavouriteExist(@PathVariable("bookId") Integer bookId, Authentication connectedUser) {

        return ResponseEntity.ok(favouriteService.isFavExist(connectedUser, bookId));
    }

    /*@GetMapping("/user-info")
    public String getUserInfo(@AuthenticationPrincipal Jwt jwt) {
        String username = jwt.getClaimAsString("preferred_username");  // Keycloak default claim for username
        String email = jwt.getClaimAsString("email");  // Keycloak default claim for email
        Object roles = jwt.getClaim("roles");  // Assuming you have "roles" claim in the token
        String id = jwt.getClaimAsString("sub");

        return "Username: " + username + ", Email: " + email + ", ID: " + id;
    }*/

}
