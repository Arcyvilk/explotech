import express from 'express';
import { join, dirname, resolve } from 'path';
import { createServer } from 'http';
import WS from './ws.mjs';
import { urlencoded, json } from 'body-parser';
import { PORT } from './config.json';

const app = express();
const server = createServer(app);
const ws = new WS(server);

app.use(urlencoded({ extended: false }));
app.use(json());

app.use('/', express.static(join(resolve(dirname('')), './build')));

server.listen(PORT, () => {
  ws.openWebsocket();
  console.log(`Server listening at port ${PORT}!`);
});
