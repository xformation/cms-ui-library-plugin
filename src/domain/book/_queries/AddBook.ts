import gql from 'graphql-tag';

export const ADD_BOOK = gql`
  mutation addBook($input: AddBookInput) {
    addBook(input: $input) {
      cmsBookVo {
        exitCode
        exitDescription
        dataList {
          id
          issueDate
          dueDate
          noOfCopiesAvailable
          bookStatus
          receivedDate
          strIssueDate
          strDueDate
          strReceivedDate
          batchId
          departmentId
          libraryId
          studentId
          student {
            id
            studentName
            rollNo
          }
          library {
            id
            rowName
            bookTitle
            bookNo
            author
            noOfCopies
          }
          department {
            id
            name
            deptHead
            branch {
              id
            }
            academicyear {
              id
            }
          }
          batch {
            id
            batch
            department {
              id
            }
          }
        }
      }
    }
  }
`;
