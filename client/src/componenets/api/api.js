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
const accountsAPI = axios.create({
  baseURL: "http://localhost:5000/accounts",
});
const usersAPI = axios.create({
  baseURL: "http://localhost:5000/users",
});
const oneUserAPI = axios.create({
  baseURL: "http://localhost:5000/users",
  // baseURL: "mongodb://127.0.0.1:27017/bankDB",
});
const oneAccountAPI = axios.create({
  baseURL: "http://localhost:5000/account",
  // baseURL: "mongodb://127.0.0.1:27017/bankDB",
});
const createNewAccount = axios.create({
  baseURL: "http://localhost:5000/admin/newAccount",
});
const createNewUser = axios.create({
  baseURL: "http://localhost:5000/users/newUser",
});

const serverApi = {
  accounts: accountsAPI,
  users: usersAPI,
  oneUser: oneUserAPI,
  oneAccount: oneAccountAPI,
  createNewAccount: createNewAccount,
  createNewUser: createNewUser,
};

export default serverApi;
