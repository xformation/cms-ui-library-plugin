import { RouteComponentProps } from 'react-router-dom';
import { graphql, QueryProps } from "react-apollo";
import * as LoadFeeSetupCacheQueryGql from './LoadFeeSetupCacheQuery.graphql';
import {ReactFunctionOrComponentClass, LoadFeeSetupCacheType} from '../../types';
import withLoadingHandler from '../../../components/withLoadingHandler';

type withFeeSetupPageDataLoaderProps = RouteComponentProps<{
  branchId: string;
  academicYearId:  string;
  }>;

type TargetComponentProps = {
    data: QueryProps & LoadFeeSetupCacheType ;
};

const withFeeSetupCacheDataLoader = (TargetComponent: ReactFunctionOrComponentClass<TargetComponentProps>) => {
    return graphql<LoadFeeSetupCacheType, withFeeSetupPageDataLoaderProps, TargetComponentProps>(LoadFeeSetupCacheQueryGql, {
      options: ({ match }) => ({
        variables: {
          branchId: 1851,
          academicYearId: 1701
        }
      })
    })(withLoadingHandler(TargetComponent));
};

export default withFeeSetupCacheDataLoader 


