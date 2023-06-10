const { getTasks } = require("../controllers/taskController");

const router = require("express").Router();

router.route("/").get(getTasks);

module.exports = router;
