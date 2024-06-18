// require module
const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");

// some important stuff
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// routes
app.get("/", function (req, res) {
  res.render("index");
});
app.post("/save", (req, res) => {
  const content = req.body.content;
  const filepath = path.join(__dirname, "public", "output.txt");

  fs.writeFile(filepath, content, function (err) {
    if (err) {
      return res.status(500).json({
        message: "Failed to save the file",
      });
    }
    res
      .status(200)
      .json({ message: "Message saved", downloadLink: "/output.txt" });
  });
});

app.listen(8008);
