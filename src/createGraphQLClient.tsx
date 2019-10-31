import { ApolloClient, createNetworkInterface } from 'react-apollo';


// 	http://dev.apollodata.com/react/initialization.html#creating-client
export const createGraphQLClient = () => {
  const networkInterface = createNetworkInterface({
    uri: 'http://100.81.3.26:8080/graphql'
  });
  const client = new ApolloClient({
    networkInterface: networkInterface

  });

  return client;
};

