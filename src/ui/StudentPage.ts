import init from '../domain/student/StudentPage/StudentApp';

export class StudentPage {
  static templateUrl = '/partials/studentpage.html';
  constructor() {
    init();
  }
}
