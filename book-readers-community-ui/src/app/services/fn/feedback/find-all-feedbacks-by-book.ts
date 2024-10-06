/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FeedbackResponse } from '../../models/feedback-response';

export interface FindAllFeedbacksByBook$Params {
  'book-id': number;
}

export function findAllFeedbacksByBook(http: HttpClient, rootUrl: string, params: FindAllFeedbacksByBook$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FeedbackResponse>>> {
  const rb = new RequestBuilder(rootUrl, findAllFeedbacksByBook.PATH, 'get');
  if (params) {
    rb.path('book-id', params['book-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<FeedbackResponse>>;
    })
  );
}

findAllFeedbacksByBook.PATH = '/feedbacks/book/{book-id}';
