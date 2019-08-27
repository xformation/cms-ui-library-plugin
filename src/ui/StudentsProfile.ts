import init from '../domain/student/StudentProfilePage/StudentsApp';

export class StudentsProfile {
  static templateUrl = '/partials/studentsprofile.html';
  constructor() {
    init();
  }
}
