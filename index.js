const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const WebSocket = require('ws');

require('dotenv').config();

const { EVENTS, eventEmitter } = require('./events');
const routes = require('./routes');
const { setUser } = require('./middlewares');

const app = express();

// Middlewares
app.use(morgan('dev'));
// Body Parser configuration

app.use(cookieParser());

app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(setUser);
app.use('/api', routes);
// Authentification
app.use('/auth', routes);

// pour heroku + commande ds package
app.use(express.static(path.join(__dirname, 'webapp', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'webapp', 'build', 'index.html'));
});

const server = http.createServer(app);

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

module.exports = app;
