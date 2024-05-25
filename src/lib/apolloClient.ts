import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import Cookies from 'js-cookie';


const httpLink = new HttpLink({ uri: 'http://localhost:8000/graphql/' });

const authLink = new ApolloLink((operation, forward) => {
  const token = Cookies.get('jwt_token');
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    }
  });
  return forward(operation);
});
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    uri: process.env.BACKEND_URL,
    cache: new InMemoryCache()
});

export default client;