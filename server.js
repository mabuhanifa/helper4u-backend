const express = require("express");
const port = process.env.PORT || 3000;
const cors = require("cors");
const app = express();

const connection = require("./db");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  const selectDataQuery = `SELECT * FROM task`;
  connection.query(selectDataQuery, (err, results) => {
    if (err) {
      console.error("Error retrieving data:", err);
      connection.end(); // Close the MySQL connection
      return;
    }
    console.log(results);
  });

  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
