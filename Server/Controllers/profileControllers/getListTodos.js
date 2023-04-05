const mysql = require('mysql2');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
  };
const pool = mysql.createPool(config);

exports.getListTodos = function getListTodos (req, res) {
    const {username} = req.user;
    const List_ID = req.query.listId;
    
  const sql = `
  SELECT * FROM Todos
  WHERE List_ID = ?`;

  pool.execute(sql, [List_ID], (error, result) => {
    if (error) return res.sendStatus(500);

    return res.status(200).json(result);
  })
}