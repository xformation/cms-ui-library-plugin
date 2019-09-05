import init from '../domain/student/CreateExam/MarkExamApp';

export class MarkExam {
  static templateUrl = '/partials/addexam.html';
  constructor() {
    init();
  }
}
