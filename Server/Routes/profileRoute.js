const express = require('express');
const { createList, createTodos } = require('../Controllers/profileControllers/createNewList');
const { deleteList, deleteTodosFromDeletedList } = require('../Controllers/profileControllers/deleteList');
const { getAllUsers } = require('../Controllers/profileControllers/getAllUsers');
const { getListTodos } = require('../Controllers/profileControllers/getListTODOS');
const { getTodoLists } = require('../Controllers/profileControllers/getTodoLists');
const { userProfile } = require('../Controllers/profileControllers/userProfile');
const { authentication } = require('../Middlewares/authentication');
const profileRoute = express.Router();

profileRoute.get('/', authentication, userProfile);
profileRoute.get('/todoLists', authentication, getTodoLists);
profileRoute.get('/todos', authentication, getListTodos);

profileRoute.post('/createNewList', authentication, createList);
profileRoute.post('/createTodos', authentication, createTodos);

profileRoute.delete('/deleteList', authentication, deleteList);

profileRoute.get('/users', authentication, getAllUsers);

exports.profileRoute = profileRoute;