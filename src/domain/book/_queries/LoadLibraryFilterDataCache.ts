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
        rowName
        bookTitle
        bookNo
        author
      }
      books {
        id
        issueDate
        noOfCopiesAvailable
        dueDate
        noOfCopiesAvailable
        bookStatus
        strIssueDate
        strDueDate
      }
      students {
        id
        studentName
        rollNo
      }
    }
  }
`;
