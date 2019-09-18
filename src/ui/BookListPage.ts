import init from '../domain/book/BookListPage/LibraryApp';

export class BookListPage {
  static templateUrl = '/partials/booklistpage.html';
  constructor() {
    init();
  }
}
