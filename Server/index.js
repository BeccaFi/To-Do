const express = require('express');
const server = express();
const dotenv = require('dotenv').config();
const mysql = require('mysql2');
const joi = require('joi');
const cors = require('cors');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { authentication } = require('./Middlewares/middlewares');
const secret = process.env.SECRET; //https://randomkeygen.com/

server.use(cors({
  origin: 'http://127.0.0.1:5500',
  credentials: true //sätter headern access-control-allow-credentials
}));

server.use(express.json());
server.use(cookieParser());



const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
  };


const pool = mysql.createPool(config);

// server.get('/', (req, res) => {
//   res.render('index');
// })

server.post('/register', (req, res) => {
  const {username, password, confirmPassword, email} = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);
  console.log(hashedPassword);


  const schema = joi.object({
    email: joi.string().email().required(),
    username: joi.string().alphanum().min(3).max(20).required(),
    password: joi.string().alphanum().min(3).max(30).required(),
    confirmPassword: joi.any().valid(joi.ref('password')).required()
  });

  const validation = schema.validate(req.body);
  if (validation.error) {
   res.status(400).send(validation.error.details[0].message);
    console.log(validation.error.details[0].message);
    return;
  }

  const sql = `INSERT INTO users (Username, Password, Email)
  VALUES (?, ?, ?)`;

  pool.execute(sql, [username, hashedPassword, email], (error, result) => {
    if (error) {
      if (error.errno === 1062) {
        res.status(500).send('The email or username you have entered already exists. Please choose another one.')
        return;
      }
       return res.status(500).send(error);
    }

      res.sendStatus(201);
  })

})

server.use(authentication);
server.post('/login', (req, res) => {
  const {username, password} = req.body;

  const schema = joi.object({
    username: joi.string().required(),
    password: joi.string().required()
  });

  const validation = schema.validate(req.body);

  if (validation.error) {
    return res.status(400).send(validation.error.details[0].message);
   }

      const sql = `
      SELECT * FROM users
      WHERE username = ?`

      pool.execute(sql, [username], (error, result1) => {
        if (error){
          console.log(error);
          res.sendStatus(500);
          return;
        }

        if (result1.length === 0) {
          return res.status(401).send('The username does not exist');
        }

        const userPassword = `
        SELECT password FROM users WHERE username = ?`;

        pool.execute(userPassword, [username], (error, result2) => {
          if (error){
            console.log(error);
            res.sendStatus(500);
            return;
          }
          const hashedPassword = result2[0].password;
          const passwordsMatch = bcrypt.compareSync(password, hashedPassword);

          if (!passwordsMatch) {
            return res.status(401).send('The password is incorrect');
          }
          
          const authToken = jwt.sign(result1[0], secret, {expiresIn: 300});

            res.cookie('authToken', authToken, {
              maxAge: 900000,
              sameSite: 'none',
              // secure: true,
              httpOnly: true
            });
            res.sendStatus(200);
        })
      })
  })

// server.get('/profile', (req, res) => {
//   const {username, password} = req.query;

//   const sql = `SELECT * FROM users WHERE username = ?`;

//   pool.execute(sql, [username], (error, result) => {
//     if (error) {
//       return res.status(500).send(error);    
//     }
//       res.status(200).send(result);
//   });
// });


server.listen(5050);