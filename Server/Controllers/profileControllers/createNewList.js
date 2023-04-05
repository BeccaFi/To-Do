const bodyParser = require('body-parser');
const mysql = require('mysql2');
const joi = require('joi');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
  };
const pool = mysql.createPool(config);

exports.createList = function createList (req, res) {

    const {Username} = req.user;
    const {listName} = req.body;

    const schema = joi.object({
        listName: joi.string().max(50).required()
      });
    
      const validation = schema.validate(req.body);
    
      if (validation.error) return res.status(400).send(validation.error.details[0].message);

    const sql = `
    INSERT INTO ToDoLists (Listname, Username)
    VALUES (?, ?)`

    pool.execute(sql, [listName, Username], (error, result) => {
        if (error) return res.sendStatus(500);

        return res.status(201).send(result);
    });
}



exports.createTodos = function createTodos (req, res) {

    const {Username} = req.user;

    const getID = `
    SELECT List_ID
    FROM ToDoLists
    WHERE Username = ?
    ORDER BY List_ID
    DESC
    LIMIT 1`;

    pool.execute(getID, [Username], (error, result1) => {
        if (error) return res.sendStatus(500);

        const listID = result1[0].List_ID;
        const {todo} = req.body;

        const schema = joi.object({
            todo: joi.string().max(300)
          });
        
          const validation = schema.validate(req.body);
        
          if (validation.error) return res.status(400).send(validation.error.details[0].message);


        const insertTodos = `
        INSERT INTO Todos(List_ID, Todo)
        VALUES(?, ?)`;

        pool.execute(insertTodos, [listID, todo], (error, result2) => {
            if (error) return res.sendStatus(500);

            return res.status(201).send(result2);
        })
    });
}