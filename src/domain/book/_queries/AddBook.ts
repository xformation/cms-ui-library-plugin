import gql from 'graphql-tag';

export const ADD_BOOK = gql`
  mutation addBook($input: [AddBookInput!]!) {
    addBook(input: $input) {
      id
      status
      issueDate
      dueDate
      receivedDate
      strIssueDate
      strDueDate
      strRecDate

      noOfCopiesAvailable
      library {
        id
      }
      student {
        id
      }
    }
  }
`;
