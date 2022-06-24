const { error } = require("console");
const fs = require("fs");
const uniqID = require("uniqid");
const chalk = require("chalk");

// const users = [];

// fs.writeFileSync("users.json", JSON.stringify(users));

// * load users
const loadData = (dir) => {
  try {
    const dataBuffer = fs.readFileSync(`users/${dir}.json`);
    const data = dataBuffer.toString();
    console.log(chalk.green(`loaded ${dir}`));
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    return [];
  }
};

// =====================================================================================
// * Save useres
const savedData = (data, dir) => {
  fs.writeFileSync(`users/${dir}.json`, JSON.stringify(data));
  console.log(chalk.yellowBright.inverse(`Data update on ${dir} database`));
};

// =====================================================================================

// * Add account
const addAccount = (user, newAccountId) => {
  const accounts = loadData("accounts");

  accounts.push({
    id: user.id,
    name: user.name,
    isActiveAccount: true,
    accountId: newAccountId,
    cash: user.cash,
    credit: user.credit,
  });
  //   console.log(accounts);
  console.log(chalk.green.inverse(`New account added to user ${user.name}`));
  savedData(accounts, "accounts");
};

// * Add User
const addUser = (newUser) => {
  const users = loadData("users");
  const index = users.findIndex((u) => u.id === newUser.id);
  const newAccountId = uniqID();

  try {
    if (index !== -1) {
      const userName = users[index].name;
      if (userName !== newUser.name) {
        console.log(
          chalk.blue.inverse(
            `User name is already ${userName},some data cant be modified when adding account to exist user `
          )
        );
        newUser.name = userName;
      }
    }

    addAccount(newUser, newAccountId);
    if (index === -1) {
      (newUser.accounts = []), newUser.accounts.push(newAccountId);
      users.push(newUser);
      console.log(chalk.green.inverse(`${newUser.name} added sucssefully!`));
      console.log(chalk.green(`Account ID: ${newUser.accounts[0]} `));
    } else {
      users[index].accounts.push(newAccountId);
    }
    savedData(users, "users");
  } catch (error) {
    console.log(chalk.red.inverse(error));
  }
};

//  =====================================================================
// * utils for depo and witherdaw
const findUser = (accountId, money) => {
  const users = loadData("users");
  const idx = users.findIndex((u) => u.accounts.includes(accountId));
  users[idx].cash += money;
  //   console.log(users);
  savedData(users, "users");
  console.log(chalk.greenBright(`${users[idx].name} cash is update.`));
};
//* Deposite or Witherdaw  to account
const depositOrWitherdawMoney = (accountId, moneyTransfer, otherId) => {
  try {
    const accounts = loadData("accounts");
    const accountIdx = accounts.findIndex((acc) => acc.accountId === accountId);
    const account = accounts[accountIdx];
    if (accountIdx === -1) {
      throw chalk.red.inverse("Account  not found...");
    }
    if (!account.isActiveAccount) {
      throw chalk.red(`Account: ${accountId} is not active...`);
    }
    if (moneyTransfer < 0) {
      if (account.cash + account.credit + moneyTransfer < 0) {
        console.log(chalk.red.inverse("Out of credit , witherdaw cant be completed"));
        return true;
      }
      console.log(chalk.gray.inverse(`Witherdaw ${moneyTransfer}$ by ${account.name}`));
    } else {
      console.log(chalk.gray.inverse(`${account.name} deposit ${moneyTransfer}$ to his account.`));
    }

    account.cash += moneyTransfer;
    // console.log(accounts);
    savedData(accounts, "accounts");
    findUser(accountId, moneyTransfer);
    if (otherId && otherId !== accountId) {
      const user = accounts.find((a) => a.accountId === otherId);
      moneyTransfer > 0
        ? console.log(chalk.white.inverse(`${moneyTransfer}$ transfer from ${user.name} to ${account.name}`))
        : console.log(chalk.white.inverse(`${-moneyTransfer}$ transfer from ${account.name} to ${user.name}`));

      depositOrWitherdawMoney(otherId, -moneyTransfer);
    }
    return true;
  } catch (error) {
    console.log(chalk.red.inverse(error));
    return false;
  }
};
// update credit
const updateCredit = (accountId, credit) => {
  if (credit < 0) {
    console.log(chalk.red.inverse("Cannot update to negative credit"));
    return;
  }
  const users = loadData("users");
  const accounts = loadData("accounts");

  const idx = users.findIndex((u) => u.accounts.includes(accountId));
  const idxA = accounts.findIndex((a) => a.accountId === accountId);
  if (!accounts[idxA].isActiveAccount) {
    console.log(chalk.red.inverse("Cannot update non-active account"));
    return false;
  }

  accounts[idxA].credit = credit;
  users[idx].credit += credit;
  //   console.log(users);
  savedData(users, "users");
  savedData(accounts, "accounts");
  console.log(chalk.greenBright(`${users[idx].name} cash is update.`));
  return true;
};

const filterUsers = (money, isAbove) => {
  const users = loadData("users");
  let filteredUsers;
  if (isAbove === "false") {
    console.log(chalk.yellow.inverse("Display users in ascending order"));
    filteredUsers = users.filter((u) => u.cash < money);
  } else {
    console.log(chalk.yellow.inverse("Display users in descending order"));
    filteredUsers = users.filter((u) => u.cash > money);
  }
  return filteredUsers;
};

// ! =============================== invoke for test =================================
// ? Example of adding user/account
// addUser({
//   id: 32121,
//   name: "Dan",
//   email: "Dan@gmail.com",
//   cash: 0,
//   credit: 0,
//   isActive: true,
// });
// ? Example deposit
// moneyTransfer("km0d3ol4hdmm28", 10);

module.exports = { loadData, savedData, addUser, depositOrWitherdawMoney, filterUsers, updateCredit };
