import {Component, OnInit} from '@angular/core';
import {BookRequest} from '../../../../services/models/book-request';
import {BookService} from '../../../../services/services/book.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-manage-book',
  templateUrl: './manage-book.component.html',
  styleUrls: ['./manage-book.component.scss']
})
export class ManageBookComponent implements OnInit {

  bookId!: number;
  isFound!: boolean;

  errorMsg: Array<string> = [];
  bookRequest: BookRequest = {
    authorName: '',
    isbn: '',
    synopsis: '',
    title: ''
  };
  selectedBookCover: any;
  selectedPicture: string | undefined;

  constructor(
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.bookId = this.activatedRoute.snapshot.params['bookId'];
    if (this.bookId) {
      this.isFound = true;
      this.bookService.findBookById({
        'bookId': this.bookId
      }).subscribe({
        next: (book) => {
          this.bookRequest = {
            id: book.id,
            title: book.title as string,
            authorName: book.authorName as string,
            isbn: book.isbn as string,
            synopsis: book.synopsis as string,
            shareable: book.shareable
          };
          this.selectedPicture='data:image/jpg;base64,' + book.cover;
        }
      });
    } else {
      this.isFound = false;
    }
  }

  saveBook() {
    this.bookService.saveBook({
      body: this.bookRequest
    }).subscribe({
      next: (bookId) => {
        this.bookService.uploadBookCoverPic({
          'book-id': bookId,
          body: {
            file: this.selectedBookCover
          }
        }).subscribe({
          next: () => {
            this.router.navigate(['/books/my-books']);
          }
        });
      },
      error: (err) => {
        this.toastService.error(err.error.error, "Please enter valid data!");
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedBookCover = event.target.files[0];
    console.log(this.selectedBookCover);

    if (this.selectedBookCover) {

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      };
      reader.readAsDataURL(this.selectedBookCover);
    }
  }

  onDeleteBook() {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook({bookId: this.bookId}).subscribe(
        {
          next: ()=> {
            this.router.navigate(['/books/my-books']);
          }
        }
      );
    }
  }
}
