import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import React from "react";

const GET_TEAMS = gql`
  query {
    teams {
      id
      createdAt
      name
      league {
        id
        title
      }
    }
  }
`;

// This component is merely an example of how to wire up a query, and can be discarded if not needed
export default function Teams() {
  const { data, loading } = useQuery(GET_TEAMS);
  return (
    <div>
      <h1>Teams</h1>
      {loading ? (
        <p>Loading</p>
      ) : (
        <p>
          {data.teams.map((team) => (
            <span>{team.name}&nbsp;</span>
          ))}
        </p>
      )}
    </div>
  );
}
