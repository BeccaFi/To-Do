const express = require('express');
const { authentication } = require('../Middlewares/authentication');
const friendRoute = express.Router();
const { getFriends } = require('../Controllers/friendControllers/getFriends');
const { postFriends } = require('../Controllers/friendControllers/postFriends');
const { removeFriends } = require('../Controllers/friendControllers/removeFriends');


friendRoute.get('/', authentication, getFriends);
friendRoute.post('/', authentication, postFriends); //Functionality not fixed
friendRoute.delete('/', authentication, removeFriends); //Functionality not fixed

exports.friendRoute = friendRoute;