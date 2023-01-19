const express = require("express");
const app = express();
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  try {
    res.status(200).render("index");
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  };
});

app.listen(process.env.PORT, () =>
  console.log(`Server launched on http://localhost:${process.env.PORT}`)
);
