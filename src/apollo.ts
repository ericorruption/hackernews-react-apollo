import type { HttpOptions } from '@apollo/client';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import Cookies from 'js-cookie';

import { AUTH_TOKEN } from './auth/AuthProvider';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      // authToken: 'TODO'
    },
  },
});

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get(AUTH_TOKEN);

  const options: HttpOptions = { headers: { ...headers } };

  // TODO investigate why 'undefined' is stringified
  if (token) {
    options.headers.authorization = `Bearer ${token}`;
  }

  return options;
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
