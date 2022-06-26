import React from "react";
import "./card.css";
import { Link } from "react-router-dom";

export default function Card({
  firstName,
  lastName,
  passportId,
  email,
  isActive,
  cash,
  credit,
  userID,
  accounts,
  accountId,
  goToUserByIdAccountProp,
  goToAccountByIdAccountProp,
}) {
  const colorIfActive = isActive ? "black" : "red";
  const goToUserById = (id) => {
    if (accounts) {
      goToUserByIdAccountProp(id);
    } else {
      goToAccountByIdAccountProp(id);
    }
  };
  const showAccountId = (accountObj) => {
    const accountArr = Object.keys(accountObj);
    return accountArr.map((a, idx) => {
      // console.log(a);
      return (
        <Link key={idx} to={`/account/${accountObj[a]}`}>
          {accountObj[a].slice(18)}
        </Link>
      );
    });
  };
  return (
    <tr style={{ color: colorIfActive }}>
      <td>{firstName + " " + lastName}</td>
      <td>{userID.slice(16)}</td>
      <td>{passportId}</td>

      {isActive ? <td>Yes</td> : <td>No</td>}
      <td>{email}</td>
      {cash < 0 ? (
        <td style={{ color: "red" }}>{cash}</td>
      ) : cash === 0 ? (
        <td>{cash}</td>
      ) : (
        <td style={{ color: "green" }}>{cash}</td>
      )}
      <td>{credit}</td>
      {accounts !== undefined ? <td>{showAccountId(accounts)}</td> : <td>{accountId.slice(16)}</td>}
      <td>
        <Link to={`/${accounts !== undefined ? "users" : "account"}/${userID}`}>
          <button className="ui active button go-to-btn" onClick={(e) => goToUserById(userID)}>
            <i className="user icon"></i>
            Watch
          </button>
        </Link>
      </td>
    </tr>
  );
}
