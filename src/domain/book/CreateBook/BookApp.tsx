import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { ApolloProvider } from "react-apollo";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { createGraphQLClient } from "../../../createGraphQLClient";
import '../../../css/dark.css';
import AddBook from "./AddBook";

const graphQLClient = createGraphQLClient();

export default function init() {
    setTimeout(function () {
        ReactDOM.render(
            <ApolloProvider client={graphQLClient}>
                <BrowserRouter>
                    <Switch>
                        {/* <Route path="/plugins/ems-attendance/page/markattendance" component={MarkAttendance} /> */}
                        <Route path="/plugins/ems-library/page/addbook" component={AddBook} />
                    </Switch>
                </BrowserRouter>
            </ApolloProvider>,
            document.getElementById("mountMarkLibrary"));
    }, 100);
}