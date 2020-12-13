import React from 'react';
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
  return <Wrapper>ROOM DUPA</Wrapper>;
}
