/* tslint:disable */
/* eslint-disable */
import { Feedback } from '../models/feedback';
export interface BookResponse {
  archived?: boolean;
  authorName?: string;
  cover?: string;
  feedbacks?: Array<Feedback>;
  id?: number;
  isbn?: string;
  owner?: string;
  rate?: number;
  shareable?: boolean;
  synopsis?: string;
  title?: string;
}
