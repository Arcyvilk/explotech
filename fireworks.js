import express from 'express';
import path from 'path';
import http from 'http';
import WS from './ws';
import bodyParser from 'body-parser';
import config from './config.json';

const app = express();
const server = http.createServer(app);
const ws = new WS(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, './build')));

server.listen(config.PORT, () => {
  ws.openWebsocket();
  console.log(`Server listening at port ${config.PORT}!`);
});
