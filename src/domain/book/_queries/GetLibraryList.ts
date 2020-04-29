import gql from 'graphql-tag';

export const GET_LIBRARY_LIST = gql`
  mutation getLibraryList($filter: LibraryFilterInput!) {
    getLibraryList(filter: $filter) {
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
      }
    }
  }
`;
