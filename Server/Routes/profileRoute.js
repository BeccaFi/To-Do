const express = require('express');
const { createList, createTodos } = require('../Controllers/profileControllers/createNewList');
const { deleteList } = require('../Controllers/profileControllers/deleteList');
const { deleteTodos } = require('../Controllers/profileControllers/deleteTodos');
const { getAllUsers } = require('../Controllers/profileControllers/getAllUsers');
const { getListTodos } = require('../Controllers/profileControllers/getListTODOS');
const { getTodoLists } = require('../Controllers/profileControllers/getTodoLists');
const { toggleTodos } = require('../Controllers/profileControllers/toggleTodos');
const { userProfile } = require('../Controllers/profileControllers/userProfile');
const { authentication } = require('../Middlewares/authentication');
const profileRoute = express.Router();

profileRoute.get('/', authentication, userProfile);
profileRoute.get('/todoLists', authentication, getTodoLists);
profileRoute.get('/todos', authentication, getListTodos); // Gets todos in list user clicks on
profileRoute.get('/users', authentication, getAllUsers); //For searchbox when adding friends (who must be users)

profileRoute.post('/createNewList', authentication, createList);
profileRoute.post('/createTodos', authentication, createTodos);

profileRoute.patch('/toggleTodos', authentication, toggleTodos);

profileRoute.delete('/deleteList', authentication, deleteList); // Deletes entire list and its todo's
profileRoute.delete('/deleteTodos', authentication, deleteTodos); // Removes single todos from existing lists



exports.profileRoute = profileRoute;