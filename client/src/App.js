import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./componenets/hompage/home";
import Accounts from "./componenets/accounts/accounts";
import { useEffect, useState } from "react";
import Users from "./componenets/users/users";
import serverApi from "./componenets/api/api";
import AccountOne from "./componenets/accounts/accountOne";

export default function App() {
  const [users, setUsers] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [userId, setUserId] = useState("");
  const [accountId, setAccountId] = useState("");

  useEffect(() => {
    const getData = async () => {
      const { data: accounts } = await serverApi.accounts.get();
      const { data: users } = await serverApi.users.get();
      // console.log(users);
      setAccounts(accounts);
      setUsers(users);
    };
    getData();
  }, [setUsers, setAccounts, isRefresh]);

  const goToUserByIdApp = (id) => {
    setUserId(id);
    // console.log(id);
  };
  const goToAccountByIdApp = (id) => {
    setAccountId(id);
    // console.log(id);
  };

  const isRefreshFunc = () => {
    setIsRefresh((p) => !p);
  };

  return (
    <div>
      <Router>
        <Home path={"/"} accounts={accounts} />
        <Accounts accounts={accounts} gotToAccountByIdAppProp={goToAccountByIdApp} />
        <Users users={users} gotToUserByIdAppProp={goToUserByIdApp} isRefreshprop={isRefreshFunc} />
        <Route path={`/users/${userId}`}>{/* <User id={userId} /> */}</Route>
        <Route path={`/account/${accountId}`}>
          <AccountOne id={accountId} />
        </Route>
      </Router>
    </div>
  );
}
