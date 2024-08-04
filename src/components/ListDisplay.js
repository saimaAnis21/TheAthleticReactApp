import React from 'react';
import styled from 'styled-components';
import { remove, find, isEmpty } from 'lodash';
import { FaMinus, FaPlus } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 400px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
}
`;
const ItemBtn = styled.div`
  ${(props) => props.selected && "color:grey;"};
  font-weight: ${(props) => (props.selected ? "lighter" : "bold")};
  background: #fff;
  font-size: 1rem;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items:center;
  width: -webkit-fill-available;
`;
 
export const AddListDisplay = ({ list, followedList, setFollowedList, addMut, refetch }) => {
  const addListItem = (id, name) => {
    const itemExists = find(followedList, (i) => i.id === id);
    if (!itemExists) {
      const newList = [...followedList];
      newList.push({ id, name });
      addMut({
        variables: {
          input: newList,
        },
      });
      refetch();
      setFollowedList(newList);
    }
  };
  return (
    <Container>
      {list.map((item) => (
        <ItemBtn
          selected={find(followedList, (i) => i.id === item.id)}
          key={item.id}
          onClick={() => addListItem(item.id, item.name)}>
          {item.name}
          <FaPlus />
        </ItemBtn>
      ))}
    </Container>
  );
};
export const RemoveListDisplay = ({ followedList, setFollowedList, addMut, refetch }) => {
  if (isEmpty(followedList)) return null;
  const removeListItem = (id) => {
    const newList = [...followedList];
    remove(newList, (item) => item.id === id);
    addMut({
      variables: {
        input: newList,
      },
    });
    refetch();
    setFollowedList(newList);
  };

  return (
    <Container>
      {followedList.map((item) => (
        <ItemBtn key={item.id} onClick={() => removeListItem(item.id)}>
          {item.name}
          <FaMinus />
        </ItemBtn>
      ))}
    </Container>
  );
};

