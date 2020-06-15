import gql from 'graphql-tag';

export const ADD_LIBRARY = gql`
  mutation addLibrary($input: AddLibraryInput) {
    addLibrary(input: $input) {
      cmsLibraryVo {
        exitCode
        exitDescription
        dataList {
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
    }
  }
`;
