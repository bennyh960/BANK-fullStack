import React, { Fragment } from "react";
import { useState } from "react";
import { Route } from "react-router-dom";
import Card from "../card/card";
import Popup from "../popup/popup";
import "./users.css";
// import { useEffect } from "react";

export default function Users({ users, isRefreshprop }) {
  const [isPopUp, setIsPopUp] = useState(false);

  const showHidePopUp = () => {
    setIsPopUp((p) => !p);
    isRefreshprop();
  };

  // useEffect(() => {
  //   console.log("use effect");
  // }, [isPopUp]);

  const drawAllusers = () => {
    // console.log(users[0]);
    return users.map((u) => {
      return (
        <Fragment key={u._id}>
          <Card
            firstName={u.firstName}
            lastName={u.lastName}
            passportId={u.passportID}
            email={u.email}
            cash={u.cash}
            credit={u.credit}
            userID={u._id}
            isActive={u.isActive}
            accounts={u.accounts}
            // goToUserByIdAccountProp={gotToUserByIdAppProp}
          />
        </Fragment>
      );
    });
  };
  return (
    <div>
      <Route exact path={"/users"}>
        <h1 style={{ textAlign: "center" }}>users</h1>
        <button className="ui active button go-to-btn" onClick={() => setIsPopUp(true)}>
          <i className="user icon"></i>
          Create New User
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
              <th>Accounts - 6 digit</th>
              <th>Go To</th>
            </tr>
          </thead>

          <tbody>{drawAllusers()}</tbody>
        </table>
        {isPopUp && <Popup isPopUpBtn={showHidePopUp} />}
      </Route>
    </div>
  );
}
