const db = require("../db.js");

// get all tasks
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

// get task by id
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

// delete task by id
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

const createTask = async (req, res) => {
  try {
    const { title, description, isCompleted } = req.body;

    const data = [title, description, isCompleted];

    const insertDataQuery = `INSERT INTO task (title, description, isCompleted) VALUES (?,?,?)`;

    db.query(insertDataQuery, data, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          success: false,
          message: "An error occurred while creating the task",
          error: err,
        });
        return;
      }
      if (results.affectedRows) {
        res.send({
          success: true,
          message: "Task created successfully",
        });
      } else {
        res.send({
          success: false,
          message: "Task could not be created",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

// update task by id
const updateTask = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const q =
      "UPDATE task SET `title`= ?, `description`= ?, `isCompleted`= ? WHERE id = ?";

    const { title, description, isCompleted } = req.body;

    const data = [title, description, isCompleted, id];

    db.query(q, data, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          success: false,
          message: "An error occurred while updating the task",
        });
        return;
      }

      if (result.affectedRows) {
        res.json({
          success: true,
          message: `Task with id ${id} has been successfully updated`,
        });
      } else {
        res.json({
          success: false,
          message: `Task with id ${id} not found`,
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the task",
    });
  }
};

module.exports = { getTasks, deleteTask, getTask, createTask, updateTask };
