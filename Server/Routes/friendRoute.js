const express = require('express');
const { authentication } = require('../Middlewares/authentication');
const friendRoute = express.Router();
const { getFriends } = require('../Controllers/friendControllers/getFriends');
const { addFriend } = require('../Controllers/friendControllers/addFriend');
const { removeFriend } = require('../Controllers/friendControllers/removeFriend');
const { getFriendsLists } = require('../Controllers/friendControllers/getFriendsLists');
const { getFriendTodos } = require('../Controllers/friendControllers/getFriendsTodos');


friendRoute.get('/', authentication, getFriends); //To view list of friends on profile
friendRoute.get('/todoLists', authentication, getFriendsLists); //View friends' todo lists
friendRoute.get('/todos', authentication, getFriendTodos); //View todos from friends' clicked todo list

friendRoute.post('/addFriend', authentication, addFriend);
friendRoute.delete('/remove', authentication, removeFriend);




exports.friendRoute = friendRoute;