import gql from 'graphql-tag';

export const BOOK_LIST = gql`
  query {
    getBookList {
      id
      issueDate
      dueDate
      noOfCopiesAvailable
      bookStatus
      receivedDate
      strIssueDate
      strDueDate
      strReceivedDate
      batchId
      departmentId
      libraryId
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
      library {
        id
        rowName
        bookTitle
        bookNo
      }
    }
  }
`;
