import axios from "axios";

// todo change url when moving from local to prodeuction
// git push heroku main
// const accountsAPI = axios.create({
//   baseURL: "/accounts",
// });
// const usersAPI = axios.create({
//   baseURL: "/users",
// });
// const oneUserAPI = axios.create({
//   baseURL: "/users",
// });
// const createNewAccount = axios.create({
//   baseURL: "/newAccount",
// });
//? ===================================================
const accounts = axios.create({
  baseURL: "http://localhost:5000/accounts",
});
const usersAPI = axios.create({
  baseURL: "http://localhost:5000/users",
});
const oneUserAPI = axios.create({
  baseURL: "http://localhost:5000/users",
  // baseURL: "mongodb://127.0.0.1:27017/bankDB",
});
const oneAccount = axios.create({
  baseURL: "http://localhost:5000/account",
  // baseURL: "mongodb://127.0.0.1:27017/bankDB",
});
const createNewAccount = axios.create({
  baseURL: "http://localhost:5000/accounts/newAccount",
});
const createNewUser = axios.create({
  baseURL: "http://localhost:5000/users/newUser",
});
const updateAccount = axios.create({
  baseURL: "http://localhost:5000/accounts/edit",
});
const moneyAction = axios.create({
  baseURL: "http://localhost:5000/admin/money-actions",
});

const serverApi = {
  accounts,
  users: usersAPI,
  oneUser: oneUserAPI,
  oneAccount,
  createNewAccount: createNewAccount,
  createNewUser: createNewUser,
  updateAccount,
  moneyAction,
};

export default serverApi;
