import { RouteComponentProps } from 'react-router-dom';
import { graphql, QueryProps } from "react-apollo";
import * as moment from 'moment';
import * as LoadExamSubjQueryGql from './LoadExamSubjQuery.graphql';
import {ReactFunctionOrComponentClass, LoadExamSubjQueryCacheForAdmin} from '../../types';
import withLoadingHandler from '../../../components/withLoadingHandler';


type withExamSubjPageDataLoaderProps = RouteComponentProps<{
  branchId: string;
  academicYearId:  string;
  // teacherId: string;
  // lectureDate: string;
  }>;

type TargetComponentProps = {
    data: QueryProps & LoadExamSubjQueryCacheForAdmin ;
};

const withExamSubjDataLoader = (TargetComponent: ReactFunctionOrComponentClass<TargetComponentProps>) => {
    return graphql<LoadExamSubjQueryCacheForAdmin, withExamSubjPageDataLoaderProps, TargetComponentProps>(LoadExamSubjQueryGql, {
      options: ({ match }) => ({
        variables: {
          // branchId: match.params.branchId,
          // academicYearId: match.params.branchId,
          // teacherId: match.params.branchId
          collegeId:1801 , //951 1801,
          academicYearId: 1701 // 1701 1051,
         
        }
      })
    })(withLoadingHandler(TargetComponent));
};

export default withExamSubjDataLoader 


