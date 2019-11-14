const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');

const app = express();

require('dotenv').config();

const port = process.env.PORT || 8000;
// Middlewares
app.use(morgan('dev'));
// Body Parser configuration

app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use('/api', routes);
// pour heroku + commande ds package
app.use(express.static(path.join(__dirname, 'webapp', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'webapp', 'build', 'index.html'));
});
app.listen(port, function() {
  console.log(`Example app listening on port 127.0.0.1:${port}`);
});

module.exports = app;
