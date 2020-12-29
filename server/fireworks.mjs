import express from 'express';
import { join, dirname, resolve } from 'path';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import { router } from './router.mjs';
import WS from './ws.mjs';
import config from '../config.json';

const app = express();
const server = createServer(app);
const ws = new WS(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(join(resolve(dirname('')), './build')));
app.use('/api', router);

server.listen(config.PORT, () => {
  ws.openWebsocket();
  console.log(`Server listening at port ${config.PORT}!`);
});
