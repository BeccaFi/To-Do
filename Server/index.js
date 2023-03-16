const express = require('express');
const dotenv = require('dotenv').config();
const mysql = require('mysql2');
const joi = require('joi');
const server = express();

server.set('view-engine', 'ejs');
// server.use(express.json())

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
  };

const pool = mysql.createPool(config);



server.listen(5050);