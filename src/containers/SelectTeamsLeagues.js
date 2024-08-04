import { useQuery, useMutation } from "@apollo/react-hooks";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {AddListDisplay, RemoveListDisplay} from "../components/ListDisplay";
import { pick } from "lodash";
import { GET_TEAMS, GET_LEAGUES, GET_FOLLOWED_TEAMS, GET_FOLLOWED_LEAGUES, ADD_TEAMS, ADD_LEAGUES } from "../queries";

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

const TeamAddListDisplay = (props) => <AddListDisplay {...props} />
const TeamRemoveListDisplay = (props) => <RemoveListDisplay {...props} />;
const LeagueAddListDisplay = (props) => <AddListDisplay {...props} />;
const LeagueRemoveListDisplay = (props) => <RemoveListDisplay {...props} />;

export default function SelectTeamsLeagues() {
  const [followedTeams, setFollowedTeams] = useState([]);
  const [followedLeagues, setFollowedLeagues] = useState([]);
  const [selectedOpt, setSelectedOpt] = useState("leagues");

  const { data: teamData, loading: teamLoading } = useQuery(GET_TEAMS);
  const { data: leagueData, loading: leagueLoading } = useQuery(GET_LEAGUES);

  const { data: followedTeamData, refetch: refetchFollowedTeams } = useQuery(GET_FOLLOWED_TEAMS);
  const { data: followedLeagueData, refetch: refetchFollowedLeagues } = useQuery(GET_FOLLOWED_LEAGUES);
  
  const [addFollowedTeams] = useMutation(ADD_TEAMS);
  const [addFollowedLeagues] = useMutation(ADD_LEAGUES);

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

  const AddListDisplayComps = {
    teams: (props) => (
      <TeamAddListDisplay
        list={data?.[selectedOpt] || []}
        setFollowedList={setFollowedTeams}
        followedList={followedTeams}
        addMut={addFollowedTeams}
        refetch={refetchFollowedTeams}
      />
    ),
    leagues: (props) => (
      <LeagueAddListDisplay
        list={data?.[selectedOpt] || []}
        setFollowedList={setFollowedLeagues}
        followedList={followedLeagues}
        addMut={addFollowedLeagues}
        refetch={refetchFollowedLeagues}
      />
    ),
  };
  const RemoveListDisplayComps = {
    teams: (props) => (
      <TeamRemoveListDisplay
        followedList={followedTeams}
        setFollowedList={setFollowedTeams}
        addMut={addFollowedTeams}
        refetch={refetchFollowedTeams}
      />
    ),
    leagues: (props) => (
      <LeagueRemoveListDisplay
        followedList={followedLeagues}
        setFollowedList={setFollowedLeagues}
        addMut={addFollowedLeagues}
        refetch={refetchFollowedLeagues}
      />
    ),
  };
  const AddLDComp = AddListDisplayComps[selectedOpt];
  const RemoveLDComp = RemoveListDisplayComps[selectedOpt];
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
            <AddLDComp />
          </WrapperBody>
        </Wrapper>
        <Wrapper>
          <WrapperHeader className="followed">
            {selectedOpt} you follow
          </WrapperHeader>
          <WrapperBody>
            <RemoveLDComp />
          </WrapperBody>
        </Wrapper>
      </Container>
    </>
  );
}
