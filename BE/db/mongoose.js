const mongoose = require("mongoose");
const chalk = require("chalk");

const password = "cJdVCPdEriOTlmGr";
const dbName = "bankDB";
const dbURL = `mongodb+srv://bennyh960:${password}@cluster0.eic8q.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose
  .connect(`mongodb://127.0.0.1:27017/${dbName}`, {
    // mongoose
    // .connect(dbURL, {
    // usefindAndModify: false,
    // useCreateIndex: true,
    autoIndex: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(chalk.green.inverse("Mongoose connect"));
  })
  .catch((e) => {
    console.log(chalk.red.inverse("Mongoose connecttin faild"));
    console.log(chalk.red.inverse(e.message));
  });
