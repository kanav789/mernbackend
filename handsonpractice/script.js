const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  fs.readdir(`./Files`, function (err, files) {
    res.render("index", { files: files });
  });
});
app.get("/files/:filename", (req, res) => {
  fs.readFile(
    `./files/${req.params.filename}`,
    "utf-8",
    function (err, filedata) {
      res.render("show", { filedata: filedata });
    }
  );
});

app.post("/create", (req, res) => {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    function (err) {
      res.redirect("/");
    }
  );
});

app.post("/files/:filename", (req, res) => {
  fs.unlink(`./files/${req.params.filename}`, function (err) {
    if (err) {
      console.error(err);
      res.status(500).send("An error occurred while deleting the file.");
    } else {
      res.redirect("/");
    }
  });
});
app.listen(3000);
