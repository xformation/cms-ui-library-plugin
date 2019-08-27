import * as React from "react";
import { RouteComponentProps } from "react-router";
import { gql, graphql, QueryProps } from "react-apollo";

import * as StudentQueryGql from "./StudentQuery.graphql";
import { ReactFunctionOrComponentClass, StudentQuery, StudentDetailsFragment } from "../types";
import withLoadingHandler from "../../components/withLoadingHandler";

var queryString = require('query-string');

// Specifies the parameters taken from the route definition (/.../:studentId)
type StudentPageRouteParams = {
  studentId: any
};

// Specifies the Properties that are passed to
type StudentPageProps = RouteComponentProps<StudentPageRouteParams>;

// The "full set" of properties passed to the target component
// (that is with the properties from GraphQL including the loaded student)
type StudentPageFullProps = StudentPageProps & {
  data: QueryProps & StudentQuery;
  student: StudentDetailsFragment;
};

// this function takes a Component, that must have StudentPageProps-compatible properties.
// The function loads the Student with the studentId specified in the route params
// and passes the loaded student to the specified Component
const withStudentFromRouteParams = (
  TheStudentComponent: ReactFunctionOrComponentClass<{
    student: StudentDetailsFragment;
  }>
) => {
  const withStudentFromRouteParamsWrapper = (props: StudentPageFullProps) => <TheStudentComponent student={props.data.student} />;
  return graphql<StudentQuery, StudentPageProps, StudentPageFullProps>(StudentQueryGql, {
    options: ({ match }) => (
      {
        variables: {
          studentId: queryString.parse(location.search).id
        }
      })
  })(withLoadingHandler(withStudentFromRouteParamsWrapper));
};

export default withStudentFromRouteParams;
