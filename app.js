const { json } = require("express");
const express = require("express");
const fileUpload = require("express-fileupload");
require("./BE/db/mongoose");
const userRouter = require("./BE/routes/user.routes");
const acountRouter = require("./BE/routes/accounts.router");
const bodyParser = require("body-parser");
// const errorController = require("../bankWithMongoose/BE/error/error.controller.js");

const app = express();
const PORT = process.env.PORT || 5000;
// const publicDirPath = path.join(__dirname, "../public");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(json());
app.use(fileUpload());

const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(allowCrossDomain);
app.use(userRouter);
app.use(acountRouter);

// * Step to connect heroku
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, () => {
  console.log("Server is On-Air on port ", PORT);
});
