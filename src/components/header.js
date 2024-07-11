import React from 'react'
import styled from 'styled-components'

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
  @media (max-width: 768px) {
    padding-left: 50px;
    padding-right: 50px;
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
      <span>The Athletic</span>
      <FollowBtn>
        <span>Follow</span> +
      </FollowBtn>
    </HeaderBar>
  );
}
