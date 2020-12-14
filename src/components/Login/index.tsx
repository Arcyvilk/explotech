import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import background from '../../shared/images/city.jpg';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: black;
  background-image: url(${background});
  background-size: cover;
  overflow: auto;
`;
const LoginModal = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: 3px double #666;
  background-color: black;
  box-shadow: 0 0 10px 3px #000;
  padding: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 14px;
`;
const Input = styled.input.attrs(({ empty }: { empty?: boolean }) => {
  return {
    style: {
      border: empty ? '3px double red' : '3px double grey',
    },
  };
})<{ empty?: boolean }>`
  border-radius: 4px;
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
  width: 100%;
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
const Hover = styled.span`
  cursor: help;
  color: red;
`;

export default function Login(): JSX.Element {
  const [roomId, setRoomId] = useState('' as string);
  const [nickname, setNickname] = useState('' as string);
  const [password, setPassword] = useState('' as string);
  const [canProceed, setCanProceed] = useState(false as boolean);

  useEffect(() => {
    const hasRoomId = roomId && roomId?.length !== 0;
    const hasNickname = nickname && nickname?.length !== 0;
    if (!hasRoomId || !hasNickname) {
      setCanProceed(false);
    } else {
      setCanProceed(true);
    }
  }, [roomId, nickname]);

  const onProceed = () => {
    canProceed && alert('dupa');
  };

  return (
    <Wrapper>
      <LoginModal>
        <Title>
          Your nickname<Hover title="Required">*</Hover>
        </Title>
        <Input
          type="nickname"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setNickname(event.target.value)
          }
          value={nickname}
          empty={!nickname || nickname.length === 0}
          placeholder="Your nickname"
        />
        <Title>
          Room ID<Hover title="Required">*</Hover>
        </Title>
        <Input
          type="room"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setRoomId(event.target.value)
          }
          value={roomId}
          empty={!roomId || roomId.length === 0}
          placeholder="Room ID"
        />
        <Title>Room password (optional)</Title>
        <Input
          type="password"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(event.target.value)
          }
          value={password}
          placeholder="Password"
        />
        {canProceed ? (
          <Link to={`/room/${roomId}`}>
            <Button>Join!</Button>
          </Link>
        ) : (
          <Button onClick={onProceed}>Join!</Button>
        )}
      </LoginModal>
    </Wrapper>
  );
}
