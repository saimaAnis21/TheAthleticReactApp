import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import SelectTeamsLeagues from "./containers/SelectTeamsLeagues";
import Header from './components/header';
import { Routes, Route, Outlet } from "react-router-dom";
import Articles from './containers/Articles';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql/',
});

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const About = () => <div style={{backgroundColor:'red'}}>About US</div>
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* <Route exact path="/" element={<SelectTeamsLeagues />} /> */}
            <Route path="/" element={<Articles />}/>
          </Route>
        </Routes>
      </div>
    </ApolloProvider>
  );
}

export default App;
