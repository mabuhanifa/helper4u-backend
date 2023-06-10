const {
  getTasks,
  deleteTask,
  getTask,
} = require("../controllers/taskController");

const router = require("express").Router();

router.route("/").get(getTasks);
router.route("/:id").get(getTask).delete(deleteTask);

module.exports = router;
