const mysql = require('mysql2');
const joi = require('joi');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
  };
const pool = mysql.createPool(config);

exports.deleteList = function deleteList (req, res) {
    const {Username} = req.user;

    const schema = joi.object({
      listId: joi.number().required()
    });
  
    const validation = schema.validate(req.query);
  
    if (validation.error) return res.status(500).send(validation.error.details[0].message);

    const List_ID = req.query.listId;

  const sql = `
  DELETE FROM ToDoLists
  WHERE List_ID = ? AND Username = ?`;

  pool.execute(sql, [List_ID, Username], (error, result) => {
    if (error) return res.sendStatus(500);
    
    return res.status(200).json(result);
  })
}