const express = require("express");
const port = process.env.PORT || 3000;
const cors = require("cors");
const app = express();
const taskRoutes = require("./routes/taskRoute.js");
const db = require("./db");
const errorMiddleware = require("./middlewares/errorMiddileware.js");
const notFoundMiddleware = require("./middlewares/notFoundMiddleware.js");

app.use(cors());
app.use(express.json());
app.use("/task", taskRoutes);

app.use(errorMiddleware);
app.all("*", notFoundMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
