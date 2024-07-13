import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import { find, includes, forEach } from "lodash";


const GET_ARTICLES = gql`
  query Articles {
    articles {
      id
      imageUrlString
      createdAt
      title
      team {
        id
      }
      league {
        id
      }
      author {
        name
      }
    }
  }
`;

const Img = styled.img`
width:100%;
height:100%;
object-fit:cover;
`
const ImgWrapper = styled.div`
  width: 64px;
  margin-right: 16px;
  flex: 0 0 64px;
  @media (min-width: 768px){
  width:100%;
  min-height:60%;
  }
`;
const CardText = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  align-items: flex-start;
  @media (min-width: 768px) {
    margin-left: 2px;
  }
  .author {
    font-size: 0.7rem;
    @media (min-width: 768px) {
      font-size: 0.9rem;
    }
  }
`;

const Card = styled.div`
  display: flex;
  margin: 10px;
  border: 1px solid gray;
  @media (min-width: 768px) {
    flex-direction: column;
    flex: 1 0 40%;
    width: 344px;
    height: 289px;
  }
  @media (min-width: 1024px) {
    width: 100px;
    flex: 1 0 20%;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap:wrap;
  }
  margin-left: 10px;
  margin-right: 10px;
`;

const Title = styled.span`
  font-size: 0.8rem;
  font-weight: bold;
  text-align: left;
  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;
export default function Articles({followedTeams:teamIds, followedLeagues:leagueIds}) {
  const { data, loading } = useQuery(GET_ARTICLES);
  
  const allIds = [...teamIds, ...leagueIds];
  const allTeamids = teamIds.map(i => i.id)
  const allLeagueids = leagueIds.map((i) => i.id);
  const articles = []
  forEach(data?.articles, (item) => {
    if (includes(allTeamids, item.team.id) || includes(allLeagueids, item.league.id)) { articles.push(item); }
  });
  articles.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
   return dateB - dateA ;
  })
  if (loading) <div>Loading....</div>
  
    return (
      <>
        <h1>News Feed</h1>
        <Container>
          {articles.map((article) => (
            <Card key={article.id}>
              <ImgWrapper>
                <Img src={article.imageUrlString} />
              </ImgWrapper>
              <CardText>
                <Title>{article.title}</Title>
                <span className="author">
                  {article.author.name} | {article.createdAt.split("T")[0]}
                </span>
              </CardText>
            </Card>
          ))}
        </Container>
      </>
    );
}

  