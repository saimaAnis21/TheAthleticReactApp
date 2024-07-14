import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, InMemoryCache } from "@apollo/react-hooks";
import React, { useState } from "react";
import SelectTeamsLeagues from "./containers/SelectTeamsLeagues";
import Header from './components/header';
import { Routes, Route, Outlet } from "react-router-dom";
import Articles from './containers/Articles';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql/",
  cache: new InMemoryCache(),
});

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

function App() {
  const [followedTeams, setFollowedTeams] = useState([]);
  const [followedLeagues, setFollowedLeagues] = useState([]);
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              exact
              path="/"
              element={
                <SelectTeamsLeagues
                  setFollowedTeams={setFollowedTeams}
                  setFollowedLeagues={setFollowedLeagues}
                  followedTeams={followedTeams}
                  followedLeagues={followedLeagues}
                />
              }
            />
            <Route
              path="/articles"
              element={<Articles followedTeams={followedTeams} followedLeagues={followedLeagues} />}
            />
          </Route>
        </Routes>
      </div>
    </ApolloProvider>
  );
}

export default App;
