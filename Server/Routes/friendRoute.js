const express = require('express');
const { authentication } = require('../Middlewares/authentication');
const friendRoute = express.Router();
const { getFriends } = require('../Controllers/friendControllers/getFriends');
const { addFriend } = require('../Controllers/friendControllers/addFriend');
const { removeFriend } = require('../Controllers/friendControllers/removeFriend');
const { friendProfile } = require('../Controllers/friendControllers/friendProfile');
const { getFriendsLists } = require('../Controllers/friendControllers/getFriendsLists');
const { getFriendTodos } = require('../Controllers/friendControllers/getFriendsTodos');
// const { checkClickedFriend } = require('../Middlewares/checkFriends');


friendRoute.get('/', authentication, getFriends);
friendRoute.post('/addFriend', authentication, addFriend);
friendRoute.delete('/remove', authentication, removeFriend);

friendRoute.post('/profile', authentication, friendProfile);
friendRoute.get('/todoLists', authentication, getFriendsLists);
friendRoute.get('/todos', authentication, getFriendTodos);


exports.friendRoute = friendRoute;