import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import {gql, graphql, QueryProps} from 'react-apollo';

import * as StudentQueryGql from './StudentQuery.graphql';
import {StudentDetailsFragment} from '../../types';
import withStudentFromRouteParams from '../withStudentFromRouteParams';

import StudentDetailsTable from './StudentDetailsTable';

const StudentPage = ({student}: {student: StudentDetailsFragment}) => (
  <span>
    <StudentDetailsTable student={student} />
  </span>
);

export default withStudentFromRouteParams(StudentPage);
