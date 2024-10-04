import {Component, OnInit} from '@angular/core';
import {BookResponse} from "../../../../services/models/book-response";
import {BookService} from "../../../../services/services/book.service";
import {ActivatedRoute} from "@angular/router";
import {ThemeService} from "../../../../services/theme/theme.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit {

  bookId!: number;
  book: BookResponse = {};
  private _bookCover: string | undefined;

  isDarkMode: boolean = false;

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private themeService: ThemeService,)
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
}
