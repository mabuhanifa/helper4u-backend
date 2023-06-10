const db = require("../db.js");

const getTasks = async (req, res) => {
  const selectDataQuery = `SELECT * FROM task`;
  db.query(selectDataQuery, (err, results) => {
    if (err) {
      console.error("Error retrieving data:", err);
      return;
    }
    res.send(results);
  });
};

const getTask = async (req, res) => {
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
};

const deleteTask = (req, res) => {
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
};

module.exports = { getTasks, deleteTask, getTask };
