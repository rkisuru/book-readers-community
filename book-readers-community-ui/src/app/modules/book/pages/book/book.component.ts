import {Component, OnInit} from '@angular/core';
import {BookResponse} from "../../../../services/models/book-response";
import {BookService} from "../../../../services/services/book.service";
import {ActivatedRoute} from "@angular/router";
import {ThemeService} from "../../../../services/theme/theme.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit {

  bookId!: number;
  book: BookResponse = {};
  private _bookCover: string | undefined;
  message = '';
  level: 'success' |'error' = 'success';

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private themeService: ThemeService,
    private toastService: ToastrService,
    )
  {}

  bookCover(): string | undefined {
    if (this.book.cover) {
      return 'data:image/jpg;base64,' + this.book.cover
    }
    return 'https://thumbs.dreamstime.com/z/old-book-cover-24489981.jpg?ct=jpeg';
  }

  ngOnInit() {
    this.bookId = this.activatedRoute.snapshot.params['bookId'];
    if (this.bookId) {
      this.bookService.findBookById({
        'bookId': this.bookId
      }).subscribe({
        next: (book) => {
          this.book = book;
          this.book.cover = this.bookCover();
        }
      });
    }
  }

  borrowBook() {
    this.message = '';
    this.level = 'success';
    this.bookService.borrowBook({
      'book-id': this.book.id as number
    }).subscribe({
      next: () => {
        this.toastService.success("Book borrowed successfully!");
      },
      error: (err) => {
        this.toastService.error(err.error.error, "Oops! You can't borrow this book");
      }
    });
  }

  addToFavourite() {
    this.message = '';
    this.level = 'success';
    this.bookService.addToFavourites({
      'bookId': this.book.id as number
    }).subscribe({
      next: () => {
        this.toastService.success("Book added to favourites!");
      },
      error: (err) => {
        this.toastService.error(err.error.error, "Oops! You already add this book to favourites");
      }
    });
  }

}
