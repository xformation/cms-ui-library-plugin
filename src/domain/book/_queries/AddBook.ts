import gql from 'graphql-tag';

export const ADD_BOOK = gql`
  mutation addBook($input: AddBookInput) {
    addBook(input: $input) {
      cmsBookVo {
        exitCode
        exitDescription
        dataList {
          id
          shelfNo
          bookTitle
          author
          publisher
          edition
          noOfCopies
          isbNo
          departmentId
        }
      }
    }
  }
`;
