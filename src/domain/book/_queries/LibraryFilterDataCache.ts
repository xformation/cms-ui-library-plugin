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
      issueBooks {
        id
        issueDate
        dueDate
        receivedDate
        bookStatus
        strIssueDate
        strDueDate
        strReceivedDate
      }
      books {
        id
        bookTitle
        shelfNo
        author
        publisher
        edition
        noOfCopies
        noOfCopiesAvailable
        isbNo
        departmentId
      }
      students {
        id
        studentName
        rollNo
      }
    }
  }
`;
