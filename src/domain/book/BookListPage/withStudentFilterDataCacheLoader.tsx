import { RouteComponentProps } from 'react-router-dom';
import { graphql, QueryProps } from "react-apollo";
import * as LoadLibraryQueryCacheForAdminGql from './LoadLibraryQueryCacheForAdmin.graphql';
import {ReactFunctionOrComponentClass, LoadLibraryQueryCacheForAdmin} from '../../types';
import withLoadingHandler from '../../../components/withLoadingHandler';


type withStudentFiltreDataCachePageDataLoaderProps = RouteComponentProps<{
  collegeId: string;
  academicYearId:  string;
  }>;

type TargetComponentProps = {
    data: QueryProps & LoadLibraryQueryCacheForAdmin ;
};

const withStudentFilterDataCacheLoader = (TargetComponent: ReactFunctionOrComponentClass<TargetComponentProps>) => {
    return graphql<LoadLibraryQueryCacheForAdmin, withStudentFiltreDataCachePageDataLoaderProps, TargetComponentProps>(LoadLibraryQueryCacheForAdminGql, {
      options: ({ match }) => ({
        variables: {
          // collegeId: match.params.collegeId,
          // academicYearId: match.params.academicYearId,
          
          collegeId: 1801,
          academicYearId: 1701
        }
      })
    })(withLoadingHandler(TargetComponent));
};

export default withStudentFilterDataCacheLoader 


