const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 5000;
const cors = require("cors")
const mongoDB = require("./db");
mongoDB();
// app.use(cors({
//   origin:[""],
//   methods :["POST" ,"GET" ],
//   credentials : "true"
// }))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", require("./routes/CreateUser"));
app.use("/api", require("./routes/DisplayData"));
app.use("/api", require("./routes/OrderData"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
