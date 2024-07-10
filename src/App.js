import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import Teams from './containers/Teams';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql/',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <Teams />
      </div>
    </ApolloProvider>
  );
}

export default App;
