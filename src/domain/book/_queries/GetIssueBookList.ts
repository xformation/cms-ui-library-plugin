import gql from 'graphql-tag';

export const GET_ISSUE_BOOK_LIST = gql`
  mutation getIssueBookList($filter: IssueBookListFilterInput!) {
    getIssueBookList(filter: $filter) {
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
      bookId
      studentId
      student {
        id
        studentName
        rollNo
      }
      book {
        id
        bookTitle
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
