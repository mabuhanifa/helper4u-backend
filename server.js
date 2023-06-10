const express = require("express");
const port = process.env.PORT || 3000;
const cors = require("cors");
const app = express();
const taskRoutes = require("./routes/taskRoute.js");
const db = require("./db");

app.use(cors());
app.use(express.json());
app.use('/task',taskRoutes)

app.post("/", async (req, res) => {
  try {
    const { title, description, isCompleted } = req.body;

    const data = [title, description, isCompleted];

    const insertDataQuery = `INSERT INTO task (title, description, isCompleted) VALUES (?,?,?)`;

    db.query(insertDataQuery, data, (err, results) => {
      if (err) {
        console.error("Error inserting data:", err);
        return;
      }
      res.send(results);
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
