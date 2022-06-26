const express = require("express");
const chalk = require("chalk");
const depositOrWitherdawMoney = require("../controler/account.controller.js");

const Account = require("../db/models/accounts.schema.js");
// const data = require("../../users/users.js");

const router = new express.Router();

// * Get all users or all accounts
router.get("/accounts", async (req, res) => {
  const accounts = await Account.find({}).sort({ date: "desc" });
  res.status(200).send(accounts);
});

// * Get account by ID
router.get("/account/:id", async (req, res) => {
  const user = await Account.findById(req.params.id);

  res.status(200).send(user);
});
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
    user.accounts.push(account._id.toString());
    await user.save();
    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send(`benny ${error.message}`);
    console.log(chalk.red(error.message));
  }
});

// const createNewAccount = axios.create({
//   baseURL: "http://localhost:5000/accounts/newAccount",
// });

router.patch("/accounts/edit/:id", async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    const updates = Object.keys(req.body);
    updates.forEach((update) => (account[update] = req.body[update]));
    // updates.forEach((update) => console.log(update));
    console.log(req.body);

    await account.save();
    res.send(account);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// !
router.patch("/admin/money-actions", depositOrWitherdawMoney);

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
