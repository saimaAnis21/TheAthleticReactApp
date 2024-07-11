import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import SelectTeamsLeagues from "./containers/SelectTeamsLeagues";
import Header from './components/header';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql/',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />
        <SelectTeamsLeagues />
      </div>
    </ApolloProvider>
  );
}

export default App;
