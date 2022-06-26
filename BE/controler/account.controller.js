const chalk = require("chalk");
const Account = require("../db/models/accounts.schema");
const depositOrWitherdawMoney = async (req, res) => {
  const accountId = req.body.accountId;
  const moneyTransfer = req.body.moneyTransfer;
  const otherId = req.body.otherId || "";

  const isValid = depositOrWitherdawMoneyInner(accountId, moneyTransfer, otherId);
  isValid ? res.send(`Money ${moneyTransfer} transfer from ${accountId}`) : res.send("Somthing went wrong");
};

async function depositOrWitherdawMoneyInner(accountId, moneyTransfer, otherId) {
  try {
    const account = await Account.findOne({ _id: accountId });

    if (!account.isActive) {
      throw chalk.red(`Account: ${accountId} is not active...`);
    }
    if (moneyTransfer < 0) {
      if (account.cash + account.credit + moneyTransfer < 0) {
        console.log(chalk.red.inverse("Out of credit , witherdaw cant be completed"));
        return true;
      }
      console.log(chalk.gray.inverse(`Witherdaw ${moneyTransfer}$ by ${account.firstName}`));
    } else {
      console.log(chalk.gray.inverse(`${account.firstName} deposit ${moneyTransfer}$ to his account.`));
    }

    console.log(
      chalk.yellow("name: ", account.firstName, "\n", "before:", account.cash, "type:", typeof moneyTransfer)
    );
    // moneyTransfer = parseInt(moneyTransfer);
    account.cash += moneyTransfer;

    console.log(chalk.yellow("name: ", account.firstName, "\n", "after:", account.cash, "type:", typeof moneyTransfer));

    await account.save();
    if (otherId && otherId !== accountId) {
      const accountFriend = Account.findById(otherId);
      moneyTransfer > 0
        ? console.log(
            chalk.white.inverse(`${moneyTransfer}$ transfer from ${accountFriend.firstName} to ${account.firstName}`)
          )
        : console.log(
            chalk.white.inverse(`${-moneyTransfer}$ transfer from ${account.firstName} to ${accountFriend.firstName}`)
          );

      depositOrWitherdawMoneyInner(otherId, parseInt(-moneyTransfer));
    }
    // res.send(account);
    return true;
  } catch (error) {
    console.log(chalk.red.inverse(error));
    return false;
  }
}

module.exports = depositOrWitherdawMoney;
