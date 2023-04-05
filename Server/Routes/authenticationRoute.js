const express = require('express');
const { loginUser } = require('../Controllers/authenticationControllers/login');
const { registerUser } = require('../Controllers/authenticationControllers/register');
const authenticationRoute = express.Router();

authenticationRoute.post('/register', registerUser);
authenticationRoute.post('/login', loginUser);

exports.authenticationRoute = authenticationRoute;