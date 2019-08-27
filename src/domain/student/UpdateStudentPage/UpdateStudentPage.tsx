import * as React from 'react';
import {gql, graphql, QueryProps, MutationFunc} from 'react-apollo';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import * as UpdateStudentMutationGql from './UpdateStudentMutation.graphql';
import {
  UpdateStudentMutation,
  UpdateStudentInput,
  UpdateStudentMutationVariables,
  StudentDetailsFragment,
} from '../../types';

import StudentEditForm from '../StudentEditForm';
import withStudentFromRouteParams from '../withStudentFromRouteParams';

var queryString = require('query-string');

type UpdateStudentPageRouteParams = {
  studentId: any;
};

type UpdateStudentPageProps = RouteComponentProps<UpdateStudentPageRouteParams> & {
  student: StudentDetailsFragment;
};

type UpdateStudentFullPageProps = UpdateStudentPageProps & {
  mutate: MutationFunc<UpdateStudentMutation>;
};

// The 'actual' component that receives all the props
const UpdateStudentPage = ({
  student, // from withStudentFromRouteParams HOC
  history, // from withRouter HOC
  match,
  mutate, // from graphql HOC
}: UpdateStudentFullPageProps) => (
  <StudentEditForm
    initialStudent={student}
    formTitle="Update Student"
    onFormSubmit={student => {
      return mutate({
        variables: {
          input: {
            studentId: queryString.parse(location.search).id,
            ...student,
          },
        },
      })
        .then(({data}) => {
          // history.push(`/plugins/xformation-fee-panel/page/student?id=${data.updateStudent.student.id}`);
          // history.push(`/plugins/xformation-fee-panel/page/students`);
          location.href = `${
            location.origin
          }/plugins/xformation-fee-panel/page/students`;
          // location.pathname = `/plugins/xformation-fee-panel/page/student?id=${data.updateStudent.student.id}`;
        })
        .catch(error => {
          console.log('there was an error sending the update mutation', error);
          return Promise.reject(`Could not save student: ${error}`);
        });
    }}
  />
);

export default // load the student that is specified in the URL (.../:studentId) via Graphql and add it to props
// (until the student is fetched from the GraphQL backend a 'Loading...' component is shown)
withStudentFromRouteParams(
  // add 'history' object from the Router to the props
  withRouter(
    // add GraphQL 'mutate' function (for running the UpdateStudentMutation) to props
    graphql<UpdateStudentMutation, UpdateStudentPageProps, UpdateStudentFullPageProps>(
      UpdateStudentMutationGql
    )(
      // ... and finally the 'actual' components that receives all the props
      UpdateStudentPage
    )
  )
);
