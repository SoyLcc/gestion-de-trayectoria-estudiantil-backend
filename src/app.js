const express = require('express');
const cors = require('cors');
const app = express();

// settings
app.set('port', process.env.PORT || 3001);

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/users', require('./routes/users'));
app.use('/api/subjects', require('./routes/subjects'));
app.use('/api/polls', require('./routes/polls'));
app.use('/api/votes', require('./routes/votes'));

module.exports = app;