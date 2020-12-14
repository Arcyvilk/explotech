import express from 'express';
import { join, dirname, resolve } from 'path';
import { createServer } from 'http';
import WS from './ws.mjs';
import bodyParser from 'body-parser';
import config from './config.json';

const app = express();
const server = createServer(app);
const ws = new WS(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(join(resolve(dirname('')), './build')));

server.listen(config.PORT, () => {
  ws.openWebsocket();
  console.log(`Server listening at port ${config.PORT}!`);
});
