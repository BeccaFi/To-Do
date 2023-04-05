const mysql = require('mysql2');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
  };
const pool = mysql.createPool(config);


exports.getFriendTodos = function getFriendTodos (req, res) {
    const {username} = req.user;
    const {Friend} = req.query;

  const sql = `
  SELECT * FROM Todos`;

  pool.execute(sql, (error, result) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
      return;
    }
    res.status(200).json(result);
    return;
  })

}