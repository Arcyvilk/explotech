import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Title, Input, Hover, Modal, Button } from '../shared';
import { logIntoRoom } from '../../shared/store/reducers';

export default function Login(): JSX.Element {
  const dispatch = useDispatch();
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
    if (canProceed) {
      dispatch(logIntoRoom({ roomId, nickname }));
    }
  };

  return (
    <Modal>
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
        <Link to={`/room/${roomId}`} onClick={onProceed}>
          <Button>Join!</Button>
        </Link>
      ) : (
        <Button>Join!</Button>
      )}
    </Modal>
  );
}
