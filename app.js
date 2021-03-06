require("dotenv").config({ path: "./dotenv.config" });
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const app = express();

app.use(express.json());
app.use(cors());
// app.use(morgan);
app.use("/v1/users", userRouter);

app.listen(8000, () => {
  console.log("Server is listening.");
});
