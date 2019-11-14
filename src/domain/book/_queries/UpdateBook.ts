import gql from 'graphql-tag';

export const UPDATE_BOOK = gql`
  mutation updateBook($input: UpdateBookInput!) {
    updateBook(input: $input) {
      id
      issueDate
      dueDate
      receivedDate
      noOfCopiesAvailable
      status
      student {
        id
      }
      library {
        id
      }
      strIssueDate
      strDueDate
      strRecDate
    }
  }
`;
