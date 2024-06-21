const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");

app.get("/", (req, res) => {
  res.send("Hello");
});
app.get("/create", async function (req, res) {
  let user = await userModel.create({
    username: "kanav",
    age: 25,
    email: "kanav@email.com",
  });
  res.send(user);
});
app.listen(8080);
