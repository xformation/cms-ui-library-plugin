import gql from 'graphql-tag';

export const CREATE_LIBRARY_FILTER_DATA_CACHE = gql`
  query {
    createLibraryDataCache {
      departments {
        id
        name
      }
      batches {
        id
        batch
        department {
          id
        }
      }
      libraries {
        id
        clNo
        bookTitle
        bookNo
        author
        noOfCopies
      }
      books {
        id
        issueDate
        dueDate
        receivedDate
        noOfCopiesAvailable
        bookStatus
        strIssueDate
        strDueDate
        strReceivedDate
      }
      students {
        id
        studentName
        rollNo
      }
    }
  }
`;
