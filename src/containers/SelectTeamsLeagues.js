import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
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
  color: ${props => props.selected ? 'red' : 'black'};
  border: none;
  background:white;
  font-size: 1rem;
  margin: 15px;
`;
const UpperRow = styled.div`
display:flex;
justify-content: flex-start;
`
const BottomRow = styled.div`
display: flex;
`
const Container = styled.div`
display: flex;
flex-direction: column;
width:50%;
margin: auto;
`
const TeamListDisplay = (props) => <ListDisplay {...props} />
const LeagueListDisplay = (props) => <ListDisplay {...props} />
export default function SelectTeamsLeagues() {
  const { data: teamData, loading: teamLoading } = useQuery(GET_TEAMS);
  const { data: leagueData, loading: leagueLoading } = useQuery(GET_LEAGUES);
  const data = { ...teamData, ...leagueData };

  const [selectedOpt, setSelectedOpt] = useState("leagues");
  const [followedTeams, setFollowedTeams] = useState([]);
  const [followedLeagues, setFollowedLeagues] = useState([])
  
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
          <SelectBtn selected={selectedOpt === "teams"} onClick={() => setSelectedOpt("teams")}>
            Teams
          </SelectBtn>
          <SelectBtn selected={selectedOpt === "leagues"} onClick={() => setSelectedOpt("leagues")}>
            Leagues
          </SelectBtn>
        </UpperRow>

        <BottomRow>
          <div>
            {teamLoading || leagueLoading ? (
              <p>Loading</p>
            ) : (
              ListDisplayComp
            )}
          </div>
        </BottomRow>
      </Container>
    </div>
  );
}