const express = require("express");
const port = process.env.PORT || 3000;
const cors = require("cors");
const app = express();
const taskRoutes = require("./routes/taskRoute.js");
const db = require("./db");

app.use(cors());
app.use(express.json());
app.use('/task',taskRoutes)
app.get("/:id", async (req, res) => {
  const id = req.params.id;
  const selectDataQuery = `SELECT * FROM task WHERE id = ?`;
  db.query(selectDataQuery, id, (err, results) => {
    if (err) {
      console.error("Error retrieving data:", err);
      res.send(err);
      return;
    }
    res.send(results);
  });
});

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

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM task WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      if (result.affectedRows) {
        res.send({
          message: `Task with id '${id}' deleted successfully`,
          success: true,
        });
      } else {
        res.send({
          message: `Task with id '${id}' could not be deleted`,
          success: false,
        });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
