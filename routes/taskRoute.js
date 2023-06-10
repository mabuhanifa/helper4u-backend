const {
  getTasks,
  deleteTask,
  getTask,
  createTask,
  updateTask,
} = require("../controllers/taskController");

const router = require("express").Router();

router.route("/").get(getTasks).post(createTask);

router.route("/:id").get(getTask).delete(deleteTask).patch(updateTask);

module.exports = router;
