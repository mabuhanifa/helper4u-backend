const express = require("express");
const port = process.env.PORT || 5000;
const cors = require("cors");
const app = express();
const taskRoutes = require("./routes/taskRoute.js");
const db = require("./db");
const notFoundMiddleware = require("./middleware/notFoundMiddleware.js");
const errorMiddleware = require("./middleware/errorMiddleware.js");

app.use(cors());
app.use(express.json());
app.use("/task", taskRoutes);

app.all("*", notFoundMiddleware);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
