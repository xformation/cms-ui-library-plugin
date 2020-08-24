import gql from 'graphql-tag';

export const GET_BOOK_LIST = gql`
  mutation getBookList($filter: BookFilterInput!) {
    getBookList(filter: $filter) {
      id
      shelfNo
      bookTitle
      author
      publisher
      edition
      isbNo
      noOfCopies
      noOfCopiesAvailable
      department {
        id
        name
      }
    }
  }
`;
