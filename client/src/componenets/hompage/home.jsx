import { useState } from "react";
import Navbar from "../navbar/navbar";
import "./home.css";
import serverApi from "../api/api.js";

export default function Home({ accounts }) {
  const [inputVal, setValue] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const [accountChosen, setAccountChosen] = useState("");
  const [showActionMoney, setShowAction] = useState(false);

  const onChange = ({ target: { value } }) => {
    setValue(value);
    setSearchRes(accounts.filter((a) => a.firstName.includes(value)));
    if (!value) setSearchRes([]);
  };

  const toggleAction = () => {
    setShowAction((p) => !p);
  };
  const searchMap = (showAccountDataParm) => {
    // console.log(searchRes);
    return searchRes.map((res) => {
      // return <div key={res._id}>{res.firstName}</div>;
      return <SearchResults account={res} showAccountDataProp={showAccountDataParm} />;
    });
  };

  const showAccountDataProp = (account) => {
    // console.log(account);
    setAccountChosen(account);
  };

  return (
    <div>
      <Navbar />
      <div classNname="ui category search">
        <div classNname="ui icon input">
          <input
            classNname="prompt"
            type="text"
            value={inputVal}
            onChange={onChange}
            placeholder="Search accounts..."
          />
          <i classNname="search icon"></i>
        </div>
        <div classNname="results">{searchMap(showAccountDataProp)}</div>
        {/* <div>{searchMap()}</div> */}
      </div>
      {accountChosen && <Action account={accountChosen} toggleAction={toggleAction} />}
      {showActionMoney && <ActionTaken account={accountChosen} toggleAction={toggleAction} />}
    </div>
  );
}

function SearchResults({ showAccountDataProp, account }) {
  const showAccountData = () => {
    showAccountDataProp(account);
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
      <div className={`step actionButton `} onClick={toggleAction}>
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
function ActionTaken({ account, action, toggleAction }) {
  // console.log(account);
  const actionMoney = (e) => {
    e.preventDefault();
    serverApi.moneyAction.patch("/", {
      accountId: account._id,
      moneyTransfer: 5,
      otherId: "62b770bd3b8e4c5f533b6f0c",
    });
    toggleAction();
  };

  return (
    <div className="form-container-action">
      <form class="ui form">
        <div class="field">
          <label>Money to {action}</label>
          <input type="number" name="cash" placeholder="cash" />
        </div>

        <div class="field">
          <div class="ui checkbox">
            <input type="checkbox" tabindex="0" class="hidden" />
            <label>I agree to the Terms and Conditions</label>
          </div>
        </div>
        <button class="ui button" type="submit" onClick={actionMoney}>
          Submit
        </button>
        <button class="ui button" type="submit" onClick={toggleAction}>
          Cancle
        </button>
      </form>
    </div>
  );
}
