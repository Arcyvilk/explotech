import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { Title, Input, Hover, Modal, Button } from '../shared';
import { logIntoRoom } from '../../shared/store/reducers';
import { RootState } from '../../shared/store';

export default function Login(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const [roomId, setRoomId] = useState('' as string);
  const [nickname, setNickname] = useState('' as string);
  const [password, setPassword] = useState('' as string);
  const [canProceed, setCanProceed] = useState(false as boolean);

  const loginStatus = useSelector(
    (state: RootState) => state.rooms.loginStatus.status,
  );

  useEffect(() => {
    const hasRoomId = roomId && roomId?.length !== 0;
    const hasNickname = nickname && nickname?.length !== 0;
    if (!hasRoomId || !hasNickname) {
      setCanProceed(false);
    } else {
      setCanProceed(true);
    }
  }, [roomId, nickname]);

  useEffect(() => {
    if (loginStatus === 'fulfilled') {
      NotificationManager.info(
        `Successfully logged into the "${roomId}" room!`,
        'Success!',
        3000,
      );
      history.push(`/room/${roomId}`);
    }
    if (loginStatus === 'rejected') {
      history.push(`/room/${roomId}`);
      NotificationManager.error(
        'An error occured while trying to log in.',
        'Close after 3000ms',
        3000,
      );
    }
  }, [loginStatus]);

  const onProceed = () => {
    if (canProceed) {
      dispatch(logIntoRoom({ roomId, nickname, password }));
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
        <Button onClick={onProceed}>Join!</Button>
      ) : (
        <Button disabled>Join!</Button>
      )}
    </Modal>
  );
}
