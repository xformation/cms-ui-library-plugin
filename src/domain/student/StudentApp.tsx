import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {ApolloProvider} from 'react-apollo';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

import {createGraphQLClient} from '../../createGraphQLClient';
import StudentListPage from './StudentListPage';
import StudentProfilePage from './StudentProfilePage';
import AddStudentPage from './AddStudentPage';
import UpdateStudentPage from './UpdateStudentPage';

const graphQLClient = createGraphQLClient();

export default function init() {
  setTimeout(function() {
    ReactDOM.render(
      <ApolloProvider client={graphQLClient}>
        <BrowserRouter>
          <Switch>
            <Route
              path="/plugins/xformation-fee-panel/page/students"
              component={StudentListPage}
            />
            <Route
              path="/plugins/xformation-fee-panel/page/studentsprofile"
              component={StudentProfilePage}
            />
            <Route
              path="/plugins/xformation-fee-panel/page/addstudent"
              component={AddStudentPage}
            />
            <Route
              path="/plugins/xformation-fee-panel/page/editstudent"
              component={UpdateStudentPage}
            />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>,
      document.getElementById('mount')
    );
  }, 10);
}
