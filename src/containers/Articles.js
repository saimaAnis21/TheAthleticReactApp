import React, {useState} from "react";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import { GET_PAGE_ARTICLES, GET_FOLLOWED_TEAMS, GET_FOLLOWED_LEAGUES } from "../queries";

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
    max-width: 344px;
    height: 289px;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap:wrap;
  }
  justify-content:center;
  margin:10px;
`;

const Title = styled.span`
  font-size: 0.8rem;
  font-weight: bold;
  text-align: left;
  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;
const PrevNextBtn = styled.button`
border:none;
background:#fff;
font-size:1.4rem;
font-weight:bold;
cursor:pointer;
`
const PrevNextWrapper = styled.div`
  display: flex;
  justify-content:center;
  gap:20px;
`;

const Msg = styled.div`
  font-size: 2rem;
  font-weight: bolder;
`;
const ArticleDisplay = ({ articles, error }) => {
  if (error) return <Msg>Sorry no articles</Msg>;
  return (
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
  );
};
export default function Articles() {
  const [pageNo, setPageNo] = useState(0);
  const PAGE_SIZE = 10;
  const { data: followedTeamData } = useQuery(GET_FOLLOWED_TEAMS);
  const { data: followedLeagueData } = useQuery(GET_FOLLOWED_LEAGUES);
  
  const teamIds = followedTeamData?.followedTeams.map((i) => i.id);
  const leagueIds = followedLeagueData?.followedLeagues.map((i) => i.id);
  
  const { data, loading, error } = useQuery(GET_PAGE_ARTICLES, {
    variables: {
      offset: pageNo*PAGE_SIZE,
      limit: PAGE_SIZE,
      teamIds,
      leagueIds,
    },
  });
  const hasNextPage = data?.pageArticles.pageInfo.hasNextPage;
  const articles = data?.pageArticles.article || [];
  
    return (
      <>
        <h1>News Feed</h1>
        <PrevNextWrapper>
          <PrevNextBtn disabled={pageNo === 0} onClick={() => setPageNo((prev) => (prev -= 1))}>
            {"<"}
          </PrevNextBtn>
          <PrevNextBtn disabled={!hasNextPage} onClick={() => setPageNo((prev) => (prev += 1))}>
            {">"}
          </PrevNextBtn>
        </PrevNextWrapper>
        {loading ? (
          <Msg>...Loading Articles</Msg>
        ) : (
          <ArticleDisplay articles={articles} error={error || articles.length === 0} />
        )}
      </>
    );
}
