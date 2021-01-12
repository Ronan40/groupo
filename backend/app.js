require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var cors = require("cors");

const commentRoutes = require("./routes/comment");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");

const app = express();
const db = require("./models/index");
db.sequelize.sync({
  force: true,
});

//CORS - Blocks HTTP calls between different servers

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use(cors());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/comment", commentRoutes);
app.use("/api/post", postRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
