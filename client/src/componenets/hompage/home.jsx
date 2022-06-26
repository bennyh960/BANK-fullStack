import React, { useState } from "react";
import Navbar from "../navbar/navbar";
import "./home.css";
import serverApi from "../api/api.js";

export default function Home({ accounts }) {
  const [inputVal, setValue] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const [accountChosen, setAccountChosen] = useState("");
  const [showActionMoney, setShowAction] = useState(false);
  const [action, setAction] = useState("");

  const onChange = ({ target: { value } }) => {
    setValue(value);
    setSearchRes(accounts.filter((a) => a.firstName.includes(value)));
    // console.log(searchRes);
    if (!value) setSearchRes([]);
  };

  const toggleAction = (actionTitle) => {
    // console.log(actionTitle);
    actionTitle ? setAction(actionTitle) : setAction("");
    setShowAction((p) => !p);
  };
  const searchMap = (showAccountDataParm) => {
    return searchRes.map((res) => {
      return (
        <React.Fragment key={res._id}>
          <SearchResults account={res} showAccountDataProp={showAccountDataParm} />
        </React.Fragment>
      );
    });
  };

  const showAccountDataProp = (account) => {
    // console.log(account);
    setAccountChosen(account);
  };

  return (
    <div>
      <Navbar />
      <div className="ui category search my-search">
        <div className="ui icon input">
          <input
            className="prompt"
            type="text"
            value={inputVal}
            onChange={onChange}
            placeholder="Search accounts(Hebrew)..."
          />
          <i className="search icon"></i>
        </div>
        {/* <div className="results">{searchMap(showAccountDataProp)}</div> */}
        <div className="search-results">{searchMap(showAccountDataProp)}</div>
      </div>
      {accountChosen && <Action account={accountChosen} toggleAction={toggleAction} />}
      {showActionMoney && <ActionTaken account={accountChosen} toggleAction={toggleAction} actionT={action} />}
    </div>
  );
}

function SearchResults({ showAccountDataProp, account }) {
  const showAccountData = () => {
    showAccountDataProp(account);
    // console.log("line 63 ,", account);
  };

  return (
    <div className="ui middle aligned selection list editItem">
      <div className="item ">
        {/* <img className="ui avatar image" src="/images/avatar/small/helen.jpg"> */}
        <div className="content">
          <div onClick={showAccountData} className="header">
            {account.firstName + " " + account.lastName}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===============action to take

function Action({ account, toggleAction }) {
  return (
    <div>
      <div className="container-account">{/* <img src="" alt="" width={300} /> */}</div>
      <h4 className="ui horizontal divider header">
        <i className="tag icon"></i>
        {account.firstName + " " + account.lastName}
      </h4>
      <div className="ui three steps ">
        <ActionChoose icon={"gem"} title="Deposite" toggleAction={toggleAction} description={"Deposite"} />
        <ActionChoose icon={"payment"} title="Witherdaw" toggleAction={toggleAction} description={"Witherdaw"} />
        <ActionChoose icon={"info"} title="Transfer" toggleAction={toggleAction} description={"Transfer"} />
      </div>
      <h4 className="ui horizontal divider header">
        <i className="bar chart icon"></i>
        Information
      </h4>
      <table className="ui definition table">
        <tbody>
          <tr>
            <td className="two wide column">Passport ID</td>
            <td>{account.passportID}</td>
          </tr>
          <tr>
            <td className="two wide column">Account ID</td>
            <td>{account._id}</td>
          </tr>
          <tr>
            <td className="two wide column">Email</td>
            <td>{account.email}</td>
          </tr>
          <tr>
            <td className="two wide column">Active </td>
            <td>{account.isActive ? "True" : "False"}</td>
          </tr>
          <tr>
            <td className="two wide column">Cash </td>
            <td>{account.cash}</td>
          </tr>
          <tr>
            <td className="two wide column">Credit </td>
            <td>{account.credit}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

//
function ActionChoose({ title, icon, toggleAction }) {
  return (
    // <div className="ui three steps ">
    <>
      <div className={`step actionButton `} onClick={() => toggleAction(title)}>
        <i className={`${icon} icon`}></i>
        <div className="content">
          <div className="title">{title}</div>
        </div>
      </div>
    </>
    // </div>
  );
}

// witherdaw deposite
function ActionTaken({ account, actionT, toggleAction }) {
  const [moneyActionData, setMoneyVal] = useState({ cash: 0, otherId: undefined });
  const actionMoney = (e) => {
    e.preventDefault();
    serverApi.moneyAction.patch("/", {
      accountId: account._id,
      moneyTransfer: moneyActionData.cash,
      // otherId: "62b770bd3b8e4c5f533b6f0c",
      otherId: moneyActionData.otherId,
    });
    toggleAction();
  };

  const onChange = ({ target: { value, name } }) => {
    setMoneyVal((p) => {
      return { ...p, [name]: value };
    });
    // console.log(name, value);
    // console.log(moneyActionData);
  };

  return (
    <div className="form-container-action">
      <form className="ui form">
        <div className="field">
          <label>Money to {actionT}</label>
          {actionT === "Transfer" && (
            <input
              type="text"
              name="otherId"
              placeholder="Transfer account id"
              value={moneyActionData.otherId}
              onChange={onChange}
            />
          )}
          <input type="number" name="cash" placeholder="cash" value={moneyActionData.cash} onChange={onChange} />
        </div>

        <div className="field">
          <div className="ui checkbox">
            <input type="checkbox" tabindex="0" className="hidden" />
          </div>
        </div>
        <button className="ui button" type="submit" onClick={actionMoney}>
          Submit
        </button>
        <button className="ui button" type="submit" onClick={toggleAction}>
          Cancle
        </button>
      </form>
    </div>
  );
}
