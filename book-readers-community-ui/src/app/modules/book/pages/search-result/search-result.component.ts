import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BookService} from "../../../../services/services/book.service";
import {BookResponse} from "../../../../services/models/book-response";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss'
})
export class SearchResultComponent implements OnInit {

  keyword: string = '';
  books: BookResponse[] = [];
  message = '';
  level: 'success' |'error' = 'success';

  constructor(
    private router: Router,
    private bookService: BookService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.keyword = params['keyword'];
      console.log(this.keyword);
      this.fetchSearchResults();
    });
  }

  fetchSearchResults() {
    if (this.keyword) {
      const url = `http://localhost:8888/api/v1/books/search`;
      this.http.post(url, null, {params: {keyword: this.keyword}}).subscribe((res: any) => {
        this.books = res;
        console.log(this.books);
      });
    }
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

  displayBookDetails(book: BookResponse) {
    this.router.navigate(['books', 'details', book.id]);
  }
}
