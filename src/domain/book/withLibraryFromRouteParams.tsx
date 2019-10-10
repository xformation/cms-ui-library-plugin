import * as React from "react";
import { RouteComponentProps } from "react-router";
import { gql, graphql, QueryProps } from "react-apollo";

import * as BookQueryGql from "./BookQuery.graphql";
import * as LibraryQueryGql from "./LibraryQuery.graphql";
import {
  ReactFunctionOrComponentClass, LibraryQuery,  
  LibraryDetailsFragment,
  BookQuery,
  BookDetailsFragment
} from "../types";
import withLoadingHandler from "../../components/withLoadingHandler";

var queryString = require('query-string');

// Specifies the parameters taken from the route definition (/.../:feeId)
type LibraryPageRouteParams = {
  libraryId: any
  bookId: any
};

// Specifies the Properties that are passed to
type LibraryPageProps = RouteComponentProps<LibraryPageRouteParams>;

// The "full set" of properties passed to the target component
// (that is with the properties from GraphQL including the loaded fee)
type LibraryPageFullProps = LibraryPageProps & {
  data: QueryProps & LibraryQuery & BookQuery;
  library: LibraryDetailsFragment;
  book: BookDetailsFragment;
};

// this function takes a Component, that must have FeePageProps-compatible properties.
// The function loads the Fee with the feeId specified in the route params
// and passes the loaded fee to the specified Component
const withLibraryFromRouteParams = (
  TheLibraryComponent: ReactFunctionOrComponentClass<{
    library: LibraryDetailsFragment;
    book: BookDetailsFragment
  }>
) => {
  const withLibraryFromRouteParamsWrapper = (props: LibraryPageFullProps) => <TheLibraryComponent library={props.data.library} book={props.data.book} />;
  return graphql<LibraryQuery,  LibraryPageProps, LibraryPageFullProps>(LibraryQueryGql,  {
    options: ({ match }) => (
      {
        variables: {
          libraryId: queryString.parse(location.search).id,
          bookId: queryString.parse(location.search).id
        }
      })
  })(withLoadingHandler(withLibraryFromRouteParamsWrapper));
};

export default withLibraryFromRouteParams;
