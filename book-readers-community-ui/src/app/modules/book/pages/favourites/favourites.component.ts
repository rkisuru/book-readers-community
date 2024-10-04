import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BookService} from "../../../../services/services/book.service";
import {BookResponse} from "../../../../services/models/book-response";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss'
})
export class FavouritesComponent implements OnInit {

  books: BookResponse[] = [];
  message = '';
  level: 'success' |'error' = 'success';
  i!: number;
  isAvailable!: boolean;

  constructor(
    private router: Router,
    private bookService: BookService,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.favourites();
  }

  favourites(): void {
    this.bookService.getFavorites().subscribe({
      next: result => {
        this.books = result;
        for(this.i=0; this.i<this.books.length; this.i++) {
          this.isFavExist(this.books[this.i]);
        }
      }
    });
  }

  isFavExist(book: BookResponse) {
    this.bookService.isFavouriteExist({
      'bookId': book.id as number
    }).subscribe({
      next: result => {
        this.isAvailable = result;
        console.log(result);
      }
    })
  }

  borrowBook(book: BookResponse) {
    this.message = '';
    this.level = 'success';
    this.bookService.borrowBook({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        this.level = 'success';
        this.message = 'Book successfully added to your list';
      },
      error: (err) => {
        console.log(err);
        this.level = 'error';
        this.message = err.error.error;
      }
    });
  }

  removeFavourite(book: BookResponse) {
    this.message = '';
    this.level = 'success';
    this.bookService.removeFromFavourites({
      'bookId': book.id as number
    }).subscribe({
      next: () => {
        this.level = 'success';
        this.message = 'Successfully removed favourite !';
        location.reload();
      },
      error: (err) => {
        console.log(err);
        this.level = 'error';
        this.message = err.error.error;
      }
    });
  }

  displayBookDetails(book: BookResponse) {
    this.router.navigate(['books', book.id]);
  }
}
