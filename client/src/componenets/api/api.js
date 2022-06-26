import axios from "axios";

//? ===================================================
const accounts = axios.create({
  // baseURL: "http://localhost:5000/accounts",
  baseURL: "/accounts",
});
const usersAPI = axios.create({
  // baseURL: "http://localhost:5000/users",
  baseURL: "/users",
});
const oneUserAPI = axios.create({
  // baseURL: "http://localhost:5000/users",
  baseURL: "/users",
  // baseURL: "mongodb://127.0.0.1:27017/bankDB",
});
const oneAccount = axios.create({
  // baseURL: "http://localhost:5000/account",
  baseURL: "/account",
  // baseURL: "mongodb://127.0.0.1:27017/bankDB",
});
const createNewAccount = axios.create({
  // baseURL: "http://localhost:5000/accounts/newAccount",
  baseURL: "/accounts/newAccount",
});
const createNewUser = axios.create({
  // baseURL: "http://localhost:5000/users/newUser",
  baseURL: "/users/newUser",
});
const updateAccount = axios.create({
  // baseURL: "http://localhost:5000/accounts/edit",
  baseURL: "/accounts/edit",
});
const moneyAction = axios.create({
  // baseURL: "http://localhost:5000/admin/money-actions",
  baseURL: "/admin/money-actions",
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
