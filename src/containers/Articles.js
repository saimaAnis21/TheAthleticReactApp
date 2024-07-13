import React from 'react'
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

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
  height:60%;
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
export default function Articles() {
  const { data, loading } = useQuery(GET_ARTICLES);
  const teamIds = ["1D77739F-CF57-4235-B901-9BC17ECD65B7", "1D77739F-CF57-4235-B901-9BC17ECD65B7","1D77739F-CF57-4235-B901-9BC17ECD65B7" ];
  const leagueIds = [
    "8D59D789-49A3-43F0-86B5-23166ACBDC15",
    "8D59D789-49A3-43F0-86B5-23166ACBDC15",
    "8D59D789-49A3-43F0-86B5-23166ACBDC15",
  ];
  
  if(loading) <div>Loading....</div>
  return (
    <>
      <h1>News Feed</h1>
      <Container>
        {data?.articles.map((article) => (
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
