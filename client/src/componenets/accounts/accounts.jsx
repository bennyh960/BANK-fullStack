import React, { Fragment } from "react";
import { useState } from "react";
import { Route } from "react-router-dom";
import Card from "../card/card";
import Popup from "../popup/popup";
import "./accounts.css";
// import { useEffect } from "react";

export default function Accounts({ accounts, gotToAccountByIdAppProp }) {
  const [isPopUp, setIsPopUp] = useState(false);

  const showHidePopUp = () => {
    setIsPopUp((p) => !p);
  };

  const drawAllAccounts = () => {
    // console.log(accounts);
    return accounts.map((u, idx) => {
      return (
        <Fragment key={idx}>
          <Card
            firstName={u.firstName}
            lastName={u.lastName}
            passportId={u.passportID}
            email={u.email}
            cash={u.cash}
            credit={u.credit}
            userID={u._id}
            isActive={u.isActive}
            accountId={u._id}
            goToAccountByIdAccountProp={gotToAccountByIdAppProp}
          />
        </Fragment>
      );
    });
  };
  return (
    <div>
      <Route exact path={"/accounts"}>
        <h1 style={{ textAlign: "center" }}>Accounts</h1>
        <button className="ui active button go-to-btn" onClick={() => setIsPopUp(true)}>
          <i className="user icon"></i>
          Create New Account
        </button>

        <table className="ui single line table">
          <thead>
            <tr>
              <th>Name</th>
              <th>User ID</th>
              <th>Passport ID</th>
              <th>Active User</th>
              <th>Email</th>
              <th>Cash</th>
              <th>Credit</th>
              <th>Account ID</th>
              <th>Go To</th>
            </tr>
          </thead>

          <tbody>{drawAllAccounts()}</tbody>
        </table>
        {isPopUp && <Popup isPopUpBtn={showHidePopUp} />}
      </Route>
    </div>
  );
}
