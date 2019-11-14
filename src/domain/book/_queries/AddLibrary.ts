import gql from 'graphql-tag';

export const ADD_LIBRARY = gql`
  mutation addLibrary($input: AddLibraryInput!) {
    addLibrary(input: $input) {
      library {
        id
        bookTitle
        author
        bookNo
        noOfCopies
        additionalInfo
        uniqueNo
        batch {
          id
        }
        subject {
          id
        }
      }
    }
  }
`;
