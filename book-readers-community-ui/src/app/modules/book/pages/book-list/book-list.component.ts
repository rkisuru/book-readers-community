import {Component, OnInit} from '@angular/core';
import {BookService} from '../../../../services/services/book.service';
import {PageResponseBookResponse} from '../../../../services/models/page-response-book-response';
import {BookResponse} from '../../../../services/models/book-response';
import {Router} from '@angular/router';

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
  isExist: boolean = true;
  bookRes: Array<BookResponse> | undefined = [];
  i!: number;

  constructor(
    private bookService: BookService,
    private router: Router
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

          this.bookRes = this.bookResponse.content;

          // @ts-ignore
          for(this.i=0; this.i<this.bookRes.length; this.i++) {
            // @ts-ignore
            this.isFavExist(this.bookRes[this.i]);
          }
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

  isFavExist(book: BookResponse) {
    this.bookService.isFavouriteExist({
      'bookId': book.id as number
    }).subscribe({
      next: result => {
        this.isExist = result;
        console.log(result);
      }
    })
  }

  addToFavourite(book: BookResponse) {
    this.message = '';
    this.level = 'success';
    this.bookService.addToFavourites({
      'bookId': book.id as number
    }).subscribe({
      next: () => {
        this.level = 'success';
        this.message = 'Book added to your favourite list';
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
