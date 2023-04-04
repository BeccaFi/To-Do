const mysql = require('mysql2');

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
  
  
    const sql = `
    INSERT INTO Friends (Username, Friend)
    VALUES (?, ?)`;
  
    pool.execute(sql, [Username, friendToAdd], (error, result) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
        return;
      }
      res.status(201).send(result);
      return;
    })
}