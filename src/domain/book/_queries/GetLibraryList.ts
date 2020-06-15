import gql from 'graphql-tag';

export const GET_LIBRARY_LIST = gql`
  mutation getLibraryList($filter: LibraryFilterInput!) {
    getLibraryList(filter: $filter) {
      id
      clNo
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
