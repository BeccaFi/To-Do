

exports.getListTodos = function getListTodos (req, res) {
    const {username} = req.user;
  const {List_ID} = req.todoList; //req.todoList behöver innehålla en key som heter List_ID. HurrrrrR???

  const sql = `
  SELECT Todo FROM Todos WHERE List_ID = ?`;

  pool.execute(sql, [List_ID], (error, result) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
      return;
    }
    res.status(200).json(result);
    return;
  })

}