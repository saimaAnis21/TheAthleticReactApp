import { gql } from "apollo-boost"; 

export const GET_TEAMS = gql`
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

export const GET_LEAGUES = gql`
  query Leagues {
    leagues {
      id
      name
    }
  }
`;

export const GET_FOLLOWED_TEAMS = gql`
  query Query {
    followedTeams {
      id
      name
    }
  }
`;
export const GET_FOLLOWED_LEAGUES = gql`
  query Query {
    followedLeagues {
      id
      name
    }
  }
`;
export const ADD_TEAMS = gql`
  mutation AddFollowedTeams($input: [AddArgs]) {
    addFollowedTeams(input: $input) {
      success
    }
  }
`;
export const ADD_LEAGUES = gql`
  mutation AddFollowedLeagues($input: [AddArgs]) {
    addFollowedLeagues(input: $input) {
      success
    }
  }
`;