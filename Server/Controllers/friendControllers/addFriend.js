const mysql = require('mysql2');
const joi = require('joi');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
  };
const pool = mysql.createPool(config);

exports.addFriend = function addFriend (req, res) {
    const {Username} = req.user;
    const {friendToAdd} = req.body;
  
    const schema = joi.object({
      friendToAdd: joi.string().required()
    });
  
    const validation = schema.validate(req.body);
  
    if (validation.error) return res.status(500).send(validation.error.details[0].message);
  
    const sql = `
    INSERT INTO Friends (Username, Friend)
    VALUES (?, ?)`;
  
    pool.execute(sql, [Username, friendToAdd], (error, result) => {
      if (error) return res.sendStatus(500);

      return res.status(201).send(result);
    })
}