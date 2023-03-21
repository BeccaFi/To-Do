const mysql = require('mysql2');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
  };
const pool = mysql.createPool(config);

exports.postFriends = function postFriend (req, res) {
    const {Username} = req.user;
    // const {Friend} = 'blabla hitta lösning';
    // Validering ej fixad än
  
    const sql = `
    INSERT INTO Friends (Username, Friend)
    VALUES (?, ?)`;
  
    pool.execute(sql, [Username, Friend], (error, result) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
        return;
      }
      res.status(201).send(result);
      return;
    })
}