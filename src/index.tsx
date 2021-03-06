import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components/App';

import './styles/index.css';

import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';

import { ApolloClient } from 'apollo-client';

import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
);
