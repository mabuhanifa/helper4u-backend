const mysql = require("mysql");
require("dotenv").config();

const createTableQuery = `
    CREATE TABLE task (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      isCompleted BOOLEAN DEFAULT false
    )`;

const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to MySQL database");
  }
//   connection.query(createTableQuery, (err, results) => {
//     if (err) {
//       console.error("Error creating table:", err);
//       connection.end(); // Close the MySQL connection
//       return;
//     }

//     console.log("Table created successfully");
//     connection.end(); // Close the MySQL connection
//   });
});

module.exports = connection;
