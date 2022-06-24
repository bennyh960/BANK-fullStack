const express = require("express");
const chalk = require("chalk");
const User = require("../db/models/users.schema.js");
const Account = require("../db/models/accounts.schema.js");
// const data = require("../../users/users.js");
const fileUpload = require("express-fileupload");

const router = new express.Router();
router.use(fileUpload());

// * Get all users or all accounts
router.get("/users", async (req, res) => {
  const users = await User.find({}).sort({ date: "desc" });
  res.status(200).send(users);
});

// * Get user or account by ID
// router.get("/api/:dir/:id", (req, res) => {
//   const users = data.loadData(req.params.dir);
//   const user = users.filter((u) => u.id == req.params.id);
//   res.status(200).send(user);
// });
// * Get Filtered users by thier money (above or bellow query)
router.get("/totalMoney", async (req, res) => {
  try {
    let users;
    if (!req.body.isAbove) {
      users = await User.find({ cash: { $lte: req.body.money } });
    } else {
      users = await User.find({ cash: { $gte: req.body.money } });
    }
    res.status(200).send({ users });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/users/newUser", async (req, res) => {
  try {
    const account = new Account(req.body);
    await account.save();
    const user = new User(req.body);
    //
    if (req.files) {
      const rest = req.files.email.data;
      const b64 = rest.toString("base64");
      const mimeType = req.files.mimetype;
      console.log(mimeType);
    }
    console.log(req.file);
    console.log(req.body);
    //
    user.accounts.push(account._id.toString());
    await user.save();
    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send(`benny ${error.message}`);
    console.log(chalk.red(error.message));
  }
});

// router.put("/admin/deposite-witherdaw/users", (req, res) => {
//   const isValidDeposit = data.depositOrWitherdawMoney(req.body.accountId, req.body.money, req.body.otherId);
//   const users = data.loadData("users");
//   const user = users.find((u) => u.accounts.includes(req.body.accountId));
//   const otheruser = users.find((u) => u.accounts.includes(req.body.otherId));

//   isValidDeposit
//     ? res.status(200).send([user, otheruser])
//     : res.status(200).send("Account id not found in active accounts...");
// });

// router.put("/admin/update/credit", (req, res) => {
//   const isValid = data.updateCredit(req.body.accountId, req.body.credit);
//   const accounts = data.loadData("accounts");
//   const account = accounts.find((a) => a.accountId === req.body.accountId);
//   isValid ? res.status(200).send(account) : res.status(200).send("Canot update non active account");
// });

module.exports = router;
