// const { publicDecrypt } = require("crypto");
const ejs = require("ejs");
const express = require("express");
const app = express();
const fs = require("fs"); // File system
const path = require("path");
const PORT = 3000;

const pathMonstersJSON = path.join(__dirname, "/data/monsters.json");
const monsters = JSON.parse(fs.readFileSync(pathMonstersJSON).toString())
console.log(JSON.parse(fs.readFileSync(pathMonstersJSON).toString()));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.render("index", {monsters});
});

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));