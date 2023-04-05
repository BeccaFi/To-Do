const mysql = require('mysql2');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
  };
const pool = mysql.createPool(config);


exports.getFriends = function getFriends (req, res) {
    const {Username} = req.user;

    const sql = `
    SELECT u.Username AS U_Username, f.Username AS F_Username, f.Friend
    FROM Users u
    JOIN Friends f ON u.Username = f.Username OR u.Username = f.Friend
    WHERE u.Username = ?`;
  
    pool.execute(sql, [Username], (error, result) => {
      if (error) return res.sendStatus(500);

      return res.status(200).json(result);
    })
}