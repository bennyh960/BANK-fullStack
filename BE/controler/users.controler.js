// const User = require("../db/models/users.schema.js");

// * Add account
// const addAccount = (user, newAccountId) => {
//   const accounts = loadData("accounts");

//   accounts.push({
//     id: user.id,
//     name: user.name,
//     isActiveAccount: true,
//     accountId: newAccountId,
//     cash: user.cash,
//     credit: user.credit,
//   });

//   console.log(chalk.green.inverse(`New account added to user ${user.name}`));
//   savedData(accounts, "accounts");
// };

//  =====================================================================
// * utils for depo and witherdaw
// const findUser = (accountId, money) => {
//   const users = loadData("users");
//   const idx = users.findIndex((u) => u.accounts.includes(accountId));
//   users[idx].cash += money;
//   console.log(users);
//   savedData(users, "users");
//   console.log(chalk.greenBright(`${users[idx].name} cash is update.`));
// };
//* Deposite or Witherdaw  or Transfer from/to account
// const depositOrWitherdawMoney = (accountId, moneyTransfer, otherId) => {
//   try {
//     const accounts = loadData("accounts");
//     const accountIdx = accounts.findIndex((acc) => acc.accountId === accountId);
//     const account = accounts[accountIdx];
//     if (accountIdx === -1) {
//       throw chalk.red.inverse("Account  not found...");
//     }
//     if (!account.isActiveAccount) {
//       throw chalk.red(`Account: ${accountId} is not active...`);
//     }
//     if (moneyTransfer < 0) {
//       if (account.cash + account.credit + moneyTransfer < 0) {
//         console.log(chalk.red.inverse("Out of credit , witherdaw cant be completed"));
//         return true;
//       }
//       console.log(chalk.gray.inverse(`Witherdaw ${moneyTransfer}$ by ${account.name}`));
//     } else {
//       console.log(chalk.gray.inverse(`${account.name} deposit ${moneyTransfer}$ to his account.`));
//     }

//     account.cash += moneyTransfer;

//     savedData(accounts, "accounts");
//     findUser(accountId, moneyTransfer);
//     if (otherId && otherId !== accountId) {
//       const user = accounts.find((a) => a.accountId === otherId);
//       moneyTransfer > 0
//         ? console.log(chalk.white.inverse(`${moneyTransfer}$ transfer from ${user.name} to ${account.name}`))
//         : console.log(chalk.white.inverse(`${-moneyTransfer}$ transfer from ${account.name} to ${user.name}`));

//       depositOrWitherdawMoney(otherId, -moneyTransfer);
//     }
//     return true;
//   } catch (error) {
//     console.log(chalk.red.inverse(error));
//     return false;
//   }
// };
// update credit
// const updateCredit = (accountId, credit) => {
//   if (credit < 0) {
//     console.log(chalk.red.inverse("Cannot update to negative credit"));
//     return;
//   }
//   const users = loadData("users");
//   const accounts = loadData("accounts");

//   const idx = users.findIndex((u) => u.accounts.includes(accountId));
//   const idxA = accounts.findIndex((a) => a.accountId === accountId);
//   if (!accounts[idxA].isActiveAccount) {
//     console.log(chalk.red.inverse("Cannot update non-active account"));
//     return false;
//   }

//   accounts[idxA].credit = credit;
//   users[idx].credit += credit;
//   console.log(users);
//   savedData(users, "users");
//   savedData(accounts, "accounts");
//   console.log(chalk.greenBright(`${users[idx].name} cash is update.`));
//   return true;
// };

// *filterUser by money

// module.exports = { loadData, savedData, addUser, depositOrWitherdawMoney, filterUsers, updateCredit };
// module.exports = {  };
