const mysql = require('mysql2');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
  };
const pool = mysql.createPool(config);

exports.deleteList = function deleteList (req, res) {
    const {Username} = req.user;

    const List_ID = req.body.listToDelete;

  const sql = `
  DELETE FROM ToDoLists
  WHERE List_ID = ? AND Username = ?`;

  pool.execute(sql, [List_ID, Username], (error, result) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
      return;
    }
    
    res.status(200).json(result);
    return;
  })
}


// exports.deleteTodosFromDeletedList = function deleteTodosFromDeletedList (req, res) {
//     const {Username} = req.user;

//     const List_ID = req.body.listToDelete;

//   const sql = `
//   DELETE FROM Todos
//   WHERE List_ID = ?`;

//   pool.execute(sql, [List_ID], (error, result) => {
//     if (error) {
//       console.log(error);
//       res.sendStatus(500);
//       return;
//     }
    
//     res.status(200).json(result);
//     return;
//   })
// }