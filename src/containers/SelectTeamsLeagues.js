import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import React, { useState, useContext } from "react";
import styled from "styled-components";
import ListDisplay from "../components/ListDisplay";

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
const GET_LEAGUES = gql`
query Leagues {
  leagues {
    id
    name
  }
}`;

const SelectBtn = styled.button`
  width: 50px;
  height: 20px;
  ${(props) => props.selected && "text-decoration: underline;"};
  border: none;
  background: white;
  margin-right: 40px;
  cursor: pointer;
`;
const UpperRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
   * {
    font-size: 1rem;
    font-weight: bold;
  }
  & .followed { 
    text-transform: capitalize;
  }
`;

const Container = styled.div`
display: flex;
flex-direction: column;
width:50%;
margin: auto;
margin-top:15px;
`
const TeamListDisplay = (props) => <ListDisplay {...props} />
const LeagueListDisplay = (props) => <ListDisplay {...props} />
export default function SelectTeamsLeagues({
  setFollowedLeagues,
  setFollowedTeams,
  followedTeams,
  followedLeagues,
}) {
  const { data: teamData, loading: teamLoading } = useQuery(GET_TEAMS);
  const { data: leagueData, loading: leagueLoading } = useQuery(GET_LEAGUES);
  const data = { ...teamData, ...leagueData };

  const [selectedOpt, setSelectedOpt] = useState("leagues");

  const ListDisplayComps = {
    teams: (
      <TeamListDisplay
        list={data?.[selectedOpt] || []}
        setFollowedList={setFollowedTeams}
        followedList={followedTeams}
      />
    ),
    leagues: (
      <LeagueListDisplay
        list={data?.[selectedOpt] || []}
        setFollowedList={setFollowedLeagues}
        followedList={followedLeagues}
      />
    ),
  };
  const ListDisplayComp = ListDisplayComps[selectedOpt];

  return (
    <div>
      <h1>Select Your Teams and Leagues</h1>
      <Container>
        <UpperRow>
          <div>
            <SelectBtn selected={selectedOpt === "teams"} onClick={() => setSelectedOpt("teams")}>
              Teams
            </SelectBtn>
            <SelectBtn
              selected={selectedOpt === "leagues"}
              onClick={() => setSelectedOpt("leagues")}>
              Leagues
            </SelectBtn>
          </div>
          <div className="followed">{selectedOpt} you follow:</div>
        </UpperRow>

        {teamLoading || leagueLoading ? <p>Loading</p> : ListDisplayComp}
      </Container>
    </div>
  );
}