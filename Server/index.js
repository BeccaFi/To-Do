const express = require('express');
const server = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')

const { friendRoute } = require('./Routes/friendRoute');
const { authenticationRoute } = require('./Routes/authenticationRoute');
const { profileRoute } = require('./Routes/profileRoute');

server.use(cors({
  origin: 'http://127.0.0.1:5500',
  credentials: true
}));

server.use(express.json());
server.use(cookieParser());
server.use(bodyParser.json());

server.use('/friends', friendRoute);
server.use('/authentication', authenticationRoute);
server.use('/profile', profileRoute)


server.get('friends/todoLists', (req, res) => {

  const {Friend} = req.query;
  console.log(Friend);

  res.sendStatus(200);

})

server.listen(5050);