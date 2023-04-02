const mysql = require('mysql2');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
  };
const pool = mysql.createPool(config);

//Måste getta alla listor med username.
// Sen ta list_id för klickade listan och hämta ut alla todos med samma list_id.
exports.getListTodos = function getListTodos (req, res) {
    const {username} = req.user;
  // const {List_ID} = req.todoList; //req.todoList behöver innehålla en key som heter List_ID. HurrrrrR???

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