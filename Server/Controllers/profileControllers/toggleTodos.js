const mysql = require('mysql2');
const joi = require('joi');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
  };
const pool = mysql.createPool(config);

exports.toggleTodos = function toggleTodos (req, res) {
    const {Username} = req.user;
    const {todoId} = req.body;

    const schema = joi.object({
      todoId: joi.number().required()
    });
  
    const validation = schema.validate(req.body);
  
    if (validation.error) return res.status(500).send(validation.error.details[0].message);

  const sql = `
  UPDATE Todos
  SET Done = IF(Done=0, 1, 0)
  WHERE ID = ?`;

  pool.execute(sql, [todoId], (error, result) => {
    if (error) return res.sendStatus(500);

    return res.status(200).json(result);
  })
}
