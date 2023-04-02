const bodyParser = require('body-parser');
const mysql = require('mysql2');

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

    const sql = `
    INSERT INTO ToDoLists (Listname, Username)
    VALUES (?, ?)`

    pool.execute(sql, [listName, Username], (error, result) => {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
          }
          res.status(201).send(result);
          return;
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
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }

        const listID = result1[0].List_ID;
        console.log(listID);

        const {todo} = req.body;

        const insertTodos = `
        INSERT INTO Todos(List_ID, Todo)
        VALUES(?, ?)`;

        pool.execute(insertTodos, [listID, todo], (error, result2) => {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            res.status(201).send(result2);
            return;
        })

    });
}