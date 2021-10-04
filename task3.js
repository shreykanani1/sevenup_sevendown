const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const port = 3000;
const url = "mongodb://localhost:27017/sevenGame";
const client = new MongoClient(url);
const mongoose = require("mongoose");

// const userModel = require("./models/userModel");
// const roomModel = require("./models/roomModel");

const userRouter = require("./routes/userRoutes");
const roomRouter = require("./routes/roomRoutes");
// connect database
mongoose.connect("mongodb://localhost/sevenGame");
app.use(express.json());

async function main() {
  try {
    await client.connect();
    console.log("Database Connection successful");
  } catch (e) {
    console.log(e);
  }
}
main().catch((err) => {
  console.log(err);
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/room", roomRouter);

app.get("*", function (req, res) {
  res.status(404).json({ status: "Fail", error: "ERROR! Page Not Found!" });
});

app.listen(port, () => console.log(`Todo app listening on port 3000!`));
