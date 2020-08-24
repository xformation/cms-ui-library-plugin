import gql from 'graphql-tag';

export const BOOK_LIST = gql`
  query {
    getBookList {
      id
      shelfNo
      bookTitle
      author
      edition
      publisher
      author
      noOfCopies
      noOfCopiesAvailable
      isbNo
      departmentId
      department {
        id
        name
        description
      }
    }
  }
`;
