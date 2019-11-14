import gql from 'graphql-tag';

export const BOOKS = gql`
  query books {
    books {
      id
      strIssueDate
      student {
        id
      }
      library {
        id
      }
    }
  }
`;
