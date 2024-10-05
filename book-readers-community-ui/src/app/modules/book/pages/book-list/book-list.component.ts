import {Component, OnInit} from '@angular/core';
import {BookService} from '../../../../services/services/book.service';
import {PageResponseBookResponse} from '../../../../services/models/page-response-book-response';
import {BookResponse} from '../../../../services/models/book-response';
import {Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  bookResponse: PageResponseBookResponse = {};
  page = 0;
  size = 5;
  pages: any = [];
  message = '';
  level: 'success' |'error' = 'success';
  i!: number;

  constructor(
    private bookService: BookService,
    private router: Router,
    private toastService: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.findAllBooks();
  }

  private findAllBooks() {
    this.bookService.findAllBooks({
      page: this.page,
      size: this.size
    })
      .subscribe({
        next: (books) => {
          this.bookResponse = books;
          this.pages = Array(this.bookResponse.totalPages)
            .fill(0)
            .map((x, i) => i);
        }
      });
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllBooks();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBooks();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllBooks();
  }

  goToLastPage() {
    this.page = this.bookResponse.totalPages as number - 1;
    this.findAllBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBooks();
  }

  get isLastPage() {
    return this.page === this.bookResponse.totalPages as number - 1;
  }

  borrowBook(book: BookResponse) {
    this.message = '';
    this.level = 'success';
    this.bookService.borrowBook({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        this.toastService.success("Book borrowed successfully!");
      },
      error: (err) => {
        this.toastService.error(err.error.error, "Oops! You can't borrow this book");
      }
    });
  }

  addToFavourite(book: BookResponse) {
    this.message = '';
    this.level = 'success';
    this.bookService.addToFavourites({
      'bookId': book.id as number
    }).subscribe({
      next: () => {
        this.toastService.success("Book added to favourites!");
      },
      error: (err) => {
        this.toastService.error(err.error.error, "Oops! You already add this book to favourites");
      }
    });
  }

  displayBookDetails(book: BookResponse) {
    this.router.navigate(['books', book.id]);
  }
}
