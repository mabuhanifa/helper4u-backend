const express = require("express");
const port = process.env.PORT || 5000;
const cors = require("cors");
const app = express();
const taskRoute = require("./routes/taskRoute.js");
const notFoundMiddleware = require("./middleware/notFoundMiddleware.js");
const errorMiddleware = require("./middleware/errorMiddleware.js");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(cors());
app.use(express.json());
app.use("/task", taskRoute);

app.all("*", notFoundMiddleware);
app.use(errorMiddleware);
