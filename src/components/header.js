import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const HeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 150px;
  padding-right: 150px;
  background: black;
  height: 46px;
  color: white;
  width: 100%;
  a {
    text-decoration: none;
    color: white;
  }
  @media (max-width: 768px) {
    padding-left: 50px;
    padding-right: 50px;
  }
  .header-start {
    display: flex;
    align-items: baseline;
    width: 200px;
    justify-content: space-between;
    .athletic {
      font-size: 1.2rem;
    }
  }
`;
const FollowBtn = styled.button`
  width: 100px;
  height: 60%;
  color: black;
  @media (max-width: 425px) {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    > span {
      display: none;
    }
  }
`;

export default function Header() {
  return (
    <HeaderBar>
      <div className="header-start">
        <Link to="/" className="athletic">
          The Athletic
        </Link>
        <Link to="/articles" className="news-feed">
          News Feed
        </Link>
      </div>
      <FollowBtn>
        <span>Follow</span> +
      </FollowBtn>
    </HeaderBar>
  );
}
