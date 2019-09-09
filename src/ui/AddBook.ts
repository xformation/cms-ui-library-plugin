import init from '../domain/book/CreateBook/BookApp';

export class AddBook {
  static templateUrl = '/partials/addbook.html';
  constructor() {
    init();
  }
}
