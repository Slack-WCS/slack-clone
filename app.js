const express = require('express');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
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

module.exports = app;
