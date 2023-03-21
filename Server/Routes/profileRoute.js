const express = require('express');
const { getListTodos } = require('../Controllers/profileControllers/getListTODOS');
const { getTodoLists } = require('../Controllers/profileControllers/getTodoLists');
const { userProfile } = require('../Controllers/profileControllers/userProfile');
const { authentication } = require('../Middlewares/authentication');
const profileRoute = express.Router();

profileRoute.get('/', authentication, userProfile);
profileRoute.get('/todoLists', authentication, getTodoLists);
profileRoute.get('/todos', authentication, getListTodos);

exports.profileRoute = profileRoute;