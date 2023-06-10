const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to MySQL database");
  }
});


module.exports = connection;