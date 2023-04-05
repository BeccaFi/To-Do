const mysql = require('mysql2');
const joi = require('joi');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
  };
const pool = mysql.createPool(config);


exports.removeFriend = function removeFriend (req, res) {
  const {Username} = req.user;

  const schema = joi.object({
    Friend: joi.string().required()
  });

  const validation = schema.validate(req.query);

  if (validation.error) return res.status(500).send(validation.error.details[0].message);

  const {Friend} = req.query;
  
const sql = `
DELETE FROM Friends
WHERE (Username = ? AND Friend = ?)
OR (Username = ? AND Friend = ?)`;

pool.execute(sql, [Username, Friend, Friend, Username], (error, result) => {
  if (error) return res.sendStatus(500);
  
  return res.status(200).json(result);
})
}