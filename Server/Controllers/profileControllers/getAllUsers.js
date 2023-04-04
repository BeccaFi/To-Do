const mysql = require('mysql2');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
  };
const pool = mysql.createPool(config);

exports.getAllUsers = function getAllUsers (req, res) {
    const {Username} = req.user;


  const sql = `SELECT * FROM Users
  WHERE Username != ?`;

  pool.execute(sql, [Username], (error, result) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
      return;
    }
    
    res.status(200).json(result);
    return;
  })
}