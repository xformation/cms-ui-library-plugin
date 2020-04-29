import gql from 'graphql-tag';

export const LIBRARY_LIST = gql`
  query {
    getLibraryList {
      id
      rowName
      bookTitle
      bookNo
      author
      noOfCopies
      uniqueNo
      departmentId
      department {
        id
        name
        description
      }
    }
  }
`;
