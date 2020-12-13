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
const LoginModal = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: 3px double #333;
  padding: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 14px;
`;
const Input = styled.input`
  margin: 16px 0;
  padding: 12px 4px;
  font-size: 14px;
  text-align: center;
`;
const Title = styled.h4`
  font-weight: normal;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  margin: 0;
  user-select: none;
`;
const Button = styled.button`
  height: 64px;
  background-color: #ff9999;
  color: red;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  user-select: none;
  cursor: pointer;
`;

export default function Login(): JSX.Element {
  return (
    <Wrapper>
      <LoginModal>
        <Title>Your nickname</Title>
        <Input type="name" />
        <Title>Room ID</Title>
        <Input type="room" />
        <Title>Room password (optional)</Title>
        <Input type="pass" />
        <Button>Join!</Button>
      </LoginModal>
    </Wrapper>
  );
}
