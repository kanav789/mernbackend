const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/read", async (req, res) => {
  let users = await userModel.find();
  res.render("read", { users });
});

app.get("/delete/:id", async (req, res) => {
  await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});

app.post("/create", async (req, res) => {
  let { name, email, ImageUrl } = req.body;
  let createdUser = await userModel.create({
    name,
    email,
    ImageUrl,
  });
  res.redirect("/read");
});

app.get("/edit/:userId", async (req, res) => {
  let user = await userModel.findOne({ _id: req.params.userId });
  res.render("edit", { user });
});

app.post("/update/:userId", async (req, res) => {
  let { name, email, ImageUrl } = req.body;
  let user = await userModel.updateOne(
    { _id: req.params.userId },
    { name, email, ImageUrl },
    { new: true }
  );
  console.log(user);
  res.redirect("/read");
});

app.listen(8080);
