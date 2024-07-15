import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ListDisplay from "../components/ListDisplay";
import { pick } from "lodash";

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
const GET_FOLLOWED_TEAMS = gql`
  query Query {
    followedTeams {
      id
      name
    }
  }
`;
const GET_FOLLOWED_LEAGUES = gql`
query Query {
  followedLeagues {
    id
    name
  }
}`;
const ADD_TEAMS = gql`
  mutation AddFollowedTeams($input: [AddArgs]) {
    addFollowedTeams(input: $input) {
      success
    }
  }
`;
const ADD_LEAGUES = gql`
  mutation AddFollowedLeagues($input: [AddArgs]) {
    addFollowedLeagues(input: $input) {
      success
    }
  }
`;
const SelectBtn = styled.button`
  width: 50px;
  height: 20px;
  ${(props) => props.selected && "text-decoration: underline;"};
  border: none;
  background: white;
  margin-right: 40px;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bolder;
`;
const Container = styled.div`
  display: flex;
  justify-content:center;
  gap:100px;
  margin: auto;
  margin-top: 15px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width:40%;
  .followed{
  font-size:1.5rem;
  font-weight:bolder;
  }
`;
const WrapperHeader = styled.div`
  display: flex;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  height:40px;
  gap:20px;
`;
const WrapperBody = styled.div`
  display:flex;
  flex-direction:column;
`;
const ConfirmBtn = styled.button`
  background: #000;
  color: #fff;
  padding: 10px;
  cursor: pointer;
`;
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
  const { data: followedTeamData, loading: followedTeamLoading } = useQuery(GET_FOLLOWED_TEAMS);
  const {
    data: followedLeagueData,
    loading: followedLeagueLoading,
  } = useQuery(GET_FOLLOWED_LEAGUES);
  const [addFollowedTeams] = useMutation(ADD_TEAMS, { variables: { input: followedTeams } });
  const [addFollowedLeagues] = useMutation(ADD_LEAGUES, { variables: { input: followedLeagues } });
   useEffect(() => {
     (async () => {
       const fTeamData = await followedTeamData?.followedTeams;
       const ft = fTeamData?.map((i) => pick(i, ["id", "name"]));
       setFollowedTeams(ft);
     })();
   }, [followedTeamData]);
  useEffect(() => {
    (async () => {
      const fLeagData = await followedLeagueData?.followedLeagues;
      const fl = fLeagData?.map((i) => pick(i, ["id", "name"]));
      setFollowedLeagues(fl);
    })();
  }, [followedLeagueData]);
  const data = { ...teamData, ...leagueData };

  const [selectedOpt, setSelectedOpt] = useState("leagues");
  
  const ListDisplayComps = {
    teams: ((props)=>
      <TeamListDisplay
        list={data?.[selectedOpt] || []}
        setFollowedList={setFollowedTeams}
        followedList={followedTeams}
        {...props}
      />
    ),
    leagues: ((props)=>
      <LeagueListDisplay
        list={data?.[selectedOpt] || []}
        setFollowedList={setFollowedLeagues}
        followedList={followedLeagues}
        {...props}
      />
    ),
  };
  const ListDisplayComp = ListDisplayComps[selectedOpt];
  return (
    <>
      <h1>Select Your Teams and Leagues</h1>
      <Container>
        <Wrapper>
          <WrapperHeader>
            <SelectBtn selected={selectedOpt === "teams"} onClick={() => setSelectedOpt("teams")}>
              Teams
            </SelectBtn>
            <SelectBtn
              selected={selectedOpt === "leagues"}
              onClick={() => setSelectedOpt("leagues")}>
              Leagues
            </SelectBtn>
          </WrapperHeader>
          <WrapperBody>
            <ListDisplayComp add={true} />
          </WrapperBody>
        </Wrapper>
        <Wrapper>
          <WrapperHeader className="followed">
            {selectedOpt} you follow
            <ConfirmBtn  onClick={addFollowedTeams}>
              Confirm Teams Selected
            </ConfirmBtn>
            <ConfirmBtn  onClick={addFollowedLeagues}>
              Confirm Leagues Selected
            </ConfirmBtn>
          </WrapperHeader>
          <WrapperBody>
            <ListDisplayComp add={false} />
          </WrapperBody>
        </Wrapper>
      </Container>
    </>
  );
}
