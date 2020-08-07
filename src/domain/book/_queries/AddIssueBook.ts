import gql from 'graphql-tag';

export const ADD_ISSUE_BOOK = gql`
  mutation addIssueBook($input: AddIssueBookInput) {
    addIssueBook(input: $input) {
      cmsIssueBookVo {
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
          bookId
          studentId
          student {
            id
            studentName
            rollNo
          }
          book {
            id
          }
          department {
            id
            name
            deptHead
            branch {
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
