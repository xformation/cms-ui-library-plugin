import gql from 'graphql-tag';

export const ISSUE_BOOK_LIST = gql`
  query {
    getIssueBookList {
      id
      issueDate
      dueDate
      bookStatus
      receivedDate
      strIssueDate
      strDueDate
      strReceivedDate
      batchId
      departmentId
      bookId
      studentId
      department {
        id
        name
      }
      batch {
        id
        batch
      }
      student {
        id
        studentName
        rollNo
      }
      book {
        id
        shelfNo
        bookTitle
        noOfCopies
        noOfCopiesAvailable
      }
    }
  }
`;
