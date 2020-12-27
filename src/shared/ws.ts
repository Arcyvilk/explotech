type WsMessage = {
  type: string;
  [key: string]: any;
};

export default class WS {
  private wsUrl: string;
  private HBinterval: number;
  private ws?: WebSocket;
  private user?: string;

  constructor() {
    this.wsUrl = 'ws://localhost:2021';
    this.HBinterval = 5000;
    this.ws = undefined;
    this.user = undefined;
  }

  sendStringified = (message: WsMessage): void =>
    this.ws?.send(JSON.stringify(message));
  // const wsUrl = `ws://${config.HOST ? config.HOST : 'localhost'}:${
  //   config.PORT
  // }`;

  // ---------------------------------------
  // ------------- WEBSOCKET ---------------
  // ---------------------------------------

  openWs = (): void => {
    if (!this.user) {
      console.log('no user');
      return;
    }
    // this.setWs(new WebSocket(this.wsUrl));
    if (!this.ws) {
      console.log('no websocket');
      return;
    }
    this.ws.onopen = () => {
      const data = {
        type: 'joined',
        user: this.user,
      };
      this.sendStringified(data);
    };
    // @ts-ignore
    this.ws.onclose = () =>
      console.log(`Websocket disconnected - ${this.wsUrl}`);
    this.ws.onmessage = (event: MessageEvent<string>) => {
      const message = JSON.parse(event.data);
      this.receiveMessage(message);
    };
    setInterval(this.sendHB, this.HBinterval);
    console.log(`Websocket connected - ${this.wsUrl}`);
  };

  receiveMessage = (message: WsMessage): void => {
    switch (message.type) {
      case 'firework':
        return this.fire(message);
      case 'update': {
        // setParticipants(
        //   message.participants.map((participant: Participant) => ({
        //     user: participant,
        //     active: false,
        //   })),
        // );
        return;
      }
      default:
        return;
    }
  };

  sendHB = (): void => {
    const data = {
      type: 'HB',
      user: this.user,
    };
    this.sendStringified(data);
  };

  // ---------------------------------------
  // ------------- FIREWORKS ---------------
  // ---------------------------------------

  sendFireEvent = (): void => {
    const firework = {
      type: 'firework',
      user: this.user,
    };
    this.sendStringified(firework);
  };

  fire = (message: WsMessage): void => {
    console.log(message);
    //   // fireworks.fire();
    //   this.activateUser(message.user, true);
    //   await this.sleep(200);
    //   this.activateUser(message.user, false);
  };

  // activateUser = (user: string, active: boolean): void => {
  //   setParticipants([
  //     ...participants.map((participant: Participant) => {
  //       if (participant.user === user) {
  //         participant.active = active;
  //       }
  //       return participant;
  //     }),
  //   ]);
  // };

  // ---------------------------------------
  // --------------- OTHER -----------------
  // ---------------------------------------

  sleep = (ms: number): Promise<void> =>
    new Promise(resolve => setTimeout(resolve, ms));
}
