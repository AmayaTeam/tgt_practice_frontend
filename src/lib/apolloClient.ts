import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';

export const getAccessToken = () => {
    console.log(localStorage.getItem('jwt_token'));
    return localStorage.getItem('jwt_token');
};

const httpLink = new HttpLink({ uri: 'http://localhost:8000/graphql/' });

const authLink = new ApolloLink((operation, forward) => {
    const token = getAccessToken();
    operation.setContext({
        headers: {
            authorization: token ? `JWT ${token}` : '',
        },
    });
    return forward(operation);
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
