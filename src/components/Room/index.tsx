import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
// import config from '../../../config.json';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: white;
`;

type WsMessage = {
  type: string;
  [key: string]: any;
};
type Participant = {
  user: string;
  active: boolean;
};
type RoomProps = {
  user?: string;
};

export default function Room(props: RoomProps): JSX.Element {
  const { user } = props;
  const { roomId } = useParams<{ roomId: string }>();
  const [ws, setWs] = useState(undefined as WebSocket | undefined);
  const [participants, setParticipants] = useState([] as Participant[]);
  const HBinterval = 5000;

  const init = () => {
    console.log('yay!');
    openWs();
  };

  useEffect(() => init(), []);

  // WEBSOCKETS
  const sendStringified = (message: WsMessage) =>
    ws?.send(JSON.stringify(message));
  // const wsUrl = `ws://${config.HOST ? config.HOST : 'localhost'}:${
  //   config.PORT
  // }`;
  const wsUrl = 'ws://localhost:2021';
  const openWs = () => {
    if (!user) {
      console.log('no user');
      return;
    }
    setWs(new WebSocket(wsUrl));
    if (!ws) {
      console.log('no websocket');
      return;
    }
    ws.onopen = () => {
      const data = {
        type: 'joined',
        user,
      };
      sendStringified(data);
    };
    // @ts-ignore
    ws.onclose = () => console.log(`Websocket disconnected - ${wsUrl}`);
    ws.onmessage = (event: MessageEvent<string>) => {
      const message = JSON.parse(event.data);
      receiveMessage(message);
    };
    setInterval(sendHB, HBinterval);
    console.log(`Websocket connected - ${wsUrl}`);
  };
  const receiveMessage = (message: WsMessage) => {
    switch (message.type) {
      case 'firework':
        return fire(message);
      case 'update': {
        setParticipants(
          message.participants.map((participant: Participant) => ({
            user: participant,
            active: false,
          })),
        );
        return;
      }
      default:
        return;
    }
  };
  const sendHB = (): void => {
    const data = {
      type: 'HB',
      user,
    };
    sendStringified(data);
  };

  // FIREWORKS
  const sendFireEvent = () => {
    const firework = {
      type: 'firework',
      user,
    };
    sendStringified(firework);
  };
  const fire = async (message: WsMessage) => {
    // fireworks.fire();
    activateUser(message.user, true);
    await sleep(200);
    activateUser(message.user, false);
  };
  const activateUser = (user: string, active: boolean) => {
    setParticipants([
      ...participants.map((participant: Participant) => {
        if (participant.user === user) {
          participant.active = active;
        }
        return participant;
      }),
    ]);
  };

  // OTHER
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <Wrapper onClick={sendFireEvent}>
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
}
