import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Wrapper } from './style';
import { RootState } from '../../shared/store';
import WS from '../../shared/ws';
import NotFound from '../NotFound';
// import config from '../../../config.json';

export default function Room(): JSX.Element {
  const { roomId } = useParams<{ roomId: string }>();
  const [ws, setWs] = useState(undefined as any);
  const room = useSelector((state: RootState) =>
    state.rooms.active.find(room => room.roomId === roomId),
  );

  useEffect(() => init(), []);

  const init = () => {
    const websocket = new WS();
    websocket.openWs();
    setWs(websocket);
  };

  const onFireEvent = () => ws.sendFireEvent();

  if (room) {
    return (
      <Wrapper onClick={onFireEvent}>
        {/* <Users>
      {this.state.participants.map(participant => (
        <Users.Nick active={participant.active}>
          <span role="img" aria-label="emoji">
            🎆
          </span>
          {participant.user}
        </Users.Nick>
      ))}
    </Users> */}
        ROOM DUPA, ID: {roomId}
      </Wrapper>
    );
  } else {
    return <NotFound />;
  }
}
