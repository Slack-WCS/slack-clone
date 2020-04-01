require('dotenv').config();

const http = require('http');
const WebSocket = require('ws');
const app = require('./app');

const server = http.createServer(app);

const { EVENTS, eventEmitter } = require('./events');

const wsserver = new WebSocket.Server({ server });

wsserver.on('connection', ws => {
  eventEmitter.on(EVENTS.MESSAGE_CREATED, result => {
    ws.send(JSON.stringify({ type: EVENTS.MESSAGE_CREATED, payload: result }));
  });
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port 127.0.0.1:${port}`);
});
