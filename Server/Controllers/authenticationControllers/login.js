const mysql = require('mysql2');
const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const secret = process.env.SECRET; //https://randomkeygen.com/

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
  };
const pool = mysql.createPool(config);

exports.loginUser = function loginUser (req, res) {
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
            
            const userCopy = Object.assign({}, result1[0])
            delete userCopy.Password;
            delete userCopy.Email;
      
            const authToken = jwt.sign(userCopy, secret, {expiresIn: '30m'});
  
              res.cookie('authToken', authToken, {
                maxAge: 1800000,
                sameSite: 'none',
                secure: true,
                httpOnly: true
              });
              res.sendStatus(200);
              return;
          })
        })
}