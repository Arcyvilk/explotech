import express from 'express';
import cors from 'cors';
import NodeCache from 'node-cache';
import { join, dirname, resolve } from 'path';
import { createServer } from 'http';
import { router } from './router.mjs';
import WS from './ws.mjs';
import config from '../config.json';

export const cache = new NodeCache();

const app = express();
const server = createServer(app);
const ws = new WS(server);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', express.static(join(resolve(dirname('')), './build')));
app.use('/api', router);

server.listen(config.PORT, () => {
  ws.openWebsocket();
  console.log(`Server listening at port ${config.PORT}!`);
});
