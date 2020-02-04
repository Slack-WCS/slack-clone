const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const app = express();

require('dotenv').config();

const port = process.env.PORT || 8000;
const { setUser } = require('./middlewares');

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
// eslint-disable-next-line func-names
app.listen(port, function() {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port 127.0.0.1:${port}`);
});

module.exports = app;
