import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: white;
`;

export default function Room(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  return <Wrapper>ROOM DUPA, ID: {id}</Wrapper>;
}
