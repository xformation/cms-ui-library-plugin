import init from '../domain/student/StudentListPage/StudentsApp';

export class StudentsPage {
    static templateUrl = '/partials/students.html';
    constructor() {
        init();
    }
}