import React from 'react';
import styled from 'styled-components';
import { remove, find } from 'lodash';

const Container = styled.div`
  display:flex;
  flex-direction: column;
  align-items:flex-start;
  height: 500px;
  width: 200px;
  margin: auto;
  overflow-y:scroll;
  border: 2px solid red;
`;
const ItemBtn = styled.button`
border: none;
color: blue;
background: #fff;
font-size: 1rem;
margin-top:10px;
`
const Wrapper = styled.div`
display:flex;
`

export default function ListDisplay({ list, setFollowedList, followedList }) {
  
  if (list.length === 0) return null;
  console.log("followedList", followedList);
  const addListItem = (id, name) => {
    const itemExists = find(followedList, i => i.id === id)
    if (!itemExists) {
      const newList = [...followedList];
      newList.push({ id, name });
      setFollowedList(newList);
    }
  };

  const removeListItem = (id) => {
    const newList = [...followedList];
    remove(newList, (item) => item.id === id);
    setFollowedList(newList);
  }
  return (
    <Wrapper>
      <Container>
        {list.map((item) => (
          <ItemBtn key={item.id} onClick={() => addListItem(item.id, item.name)}>
            {item.name}
          </ItemBtn>
        ))}
      </Container>
      <Container>
        {followedList.map((item) => (
          <ItemBtn key={item.id} onClick={() => removeListItem(item.id)}>
            {item.name}
          </ItemBtn>
        ))}
      </Container>
    </Wrapper>
  );
}
