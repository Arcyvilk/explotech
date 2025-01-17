import WebSocket from 'ws';

class WS {
  constructor(server) {
    this.HB = {
      interval: 2000,
      timeout: 10000,
    };
    this.clients = [];
    this.server = server;
    this.ws = null;
  }

  messageType = {
    joined: (message, client) => {
      this.clients.push({
        user: message.user,
        lastSeen: Date.now(),
        ws: client,
      });
      const participantsUpdate = {
        participants: this.clients.map(client => client.user),
        type: 'update',
      };
      this.clients.map(client =>
        client.ws.send(JSON.stringify(participantsUpdate)),
      );
      console.log(`${new Date().toLocaleString()} - ${message.user} joined`);
    },
    firework: message => {
      this.clients.map(client => client.ws.send(JSON.stringify(message)));
    },
    HB: message => {
      this.clients.map(client => {
        if (client.user === message.user) {
          client.lastSeen = Date.now();
        }
        return client;
      });
    },
  };

  sendInitialData = client => {
    const initialData = {
      participants: this.clients.map(client => client.user),
      type: 'update',
    };
    client.send(JSON.stringify(initialData));
  };

  filterInactiveClients = client => {
    if (Date.now() - client.lastSeen >= this.HB.timeout) {
      console.log(`${new Date().toLocaleString()} - ${client.user} left`);
      return false;
    }
    return true;
  };

  monitorHBs = () => {
    this.clients = this.clients.filter(client =>
      this.filterInactiveClients(client),
    );
    const msgUpdate = {
      participants: this.clients.map(client => client.user),
      type: 'update',
    };
    this.clients.map(client => client.ws.send(JSON.stringify(msgUpdate)));
  };

  connectToWebsocket() {
    this.ws.on('connection', client => {
      this.sendInitialData(client);
      client.on('message', msg => {
        const message = JSON.parse(msg);
        switch (message.type) {
          case 'joined':
            return this.messageType.joined(message, client);
          case 'firework':
            return this.messageType.firework(message);
          case 'HB':
            return this.messageType.HB(message);
          default:
            return;
        }
      });

      client.on('close', (/*code, reason*/) => {
        console.log('closed');
      });

      setInterval(this.monitorHBs, this.HB.interval);
    });
  }

  openWebsocket() {
    this.ws = new WebSocket.Server({ server: this.server });
    this.connectToWebsocket();
  }
}

export default WS;
