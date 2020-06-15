import gql from 'graphql-tag';

export const GET_BOOK_LIST = gql`
  mutation getBookList($filter: BookListFilterInput!) {
    getBookList(filter: $filter) {
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
      student {
        id
        studentName
        rollNo
      }
      library {
        id
        bookTitle
        bookNo
        noOfCopies
      }
      batch {
        id
        batch
      }
      department {
        id
        name
      }
    }
  }
`;
