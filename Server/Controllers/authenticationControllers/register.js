const mysql = require('mysql2');
const joi = require('joi');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
  };
const pool = mysql.createPool(config);

exports.registerUser = function registerUser (req, res) {
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
}