/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookResponse } from '../../models/book-response';

export interface SearchBook$Params {
  keyword: string;
}

export function searchBook(http: HttpClient, rootUrl: string, params: SearchBook$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookResponse>>> {
  const rb = new RequestBuilder(rootUrl, searchBook.PATH, 'post');
  if (params) {
    rb.query('keyword', params.keyword, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<BookResponse>>;
    })
  );
}

searchBook.PATH = '/books/search';
