import React, { useEffect, useState } from "react";
import "./accountOne.css";
import serverApi from "../api/api.js";
export default function AccountOne({ id }) {
  const [accountData, setAccountData] = useState("");
  const [isUpdate, setUpdate] = useState(false);

  const rerender = () => {
    setUpdate((p) => !p);
  };
  useEffect(() => {
    const getAccountAPi = async () => {
      const { data } = await serverApi.oneAccount.get(`/${id}`);
      setAccountData(data);
      //   console.log(data);
    };
    getAccountAPi();
    console.log("tesrt");
  }, [setAccountData, isUpdate]);

  return (
    <div>
      <div className="container-account">{/* <img src="" alt="" width={300} /> */}</div>
      <h4 className="ui horizontal divider header">
        <i className="tag icon"></i>
        {accountData.firstName + " " + accountData.lastName}
      </h4>
      <p>Personal information. for editing data you must manage privilage.</p>
      <h4 className="ui horizontal divider header">
        <i className="bar chart icon"></i>
        Information
      </h4>
      <table className="ui definition table">
        <tbody>
          <tr>
            <td className="two wide column">Passport ID</td>
            <td>{accountData.passportID}</td>
          </tr>
          <TableRow title="Account ID" data={accountData._id} />
          <TableRow title="Cash" data={accountData.cash} editable={false} />
          <TableRow
            rerender={rerender}
            title="Credit"
            keyv={"credit"}
            data={accountData.credit}
            editable={true}
            id={accountData._id}
          />
          <TableRow
            title="First Name"
            keyv="firstName"
            data={accountData.firstName}
            editable={true}
            id={accountData._id}
            rerender={rerender}
          />
          <TableRow
            title="Last Name"
            keyv="lastName"
            data={accountData.lastName}
            editable={true}
            id={accountData._id}
            rerender={rerender}
          />
          <TableRow title="Email" keyv={"email"} data={accountData.email} editable={true} id={accountData._id} />
          <TableRow
            title="Active"
            keyv={"isActive"}
            data={accountData.isActive ? "True" : "False"}
            editable={true}
            id={accountData._id}
            rerender={rerender}
          />
          <TableRow
            keyv="password"
            rerender={rerender}
            title="Password"
            data={accountData.password}
            editable={true}
            id={accountData._id}
          />
          <TableRow title="Join date" data={accountData.date} editable={false} />
        </tbody>
      </table>
    </div>
  );
}

function TableRow({ keyv, id, title, data, editable, rerender }) {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(data);

  const onChange = ({ target: { value } }) => {
    setValue(value);
    // console.log(value);
  };

  const toggleEditMode = () => {
    setEditMode((p) => !p);
  };

  const onSave = () => {
    console.log(keyv);
    serverApi.updateAccount.patch(`/${id}`, { [keyv]: value });
    toggleEditMode();
    rerender();
  };

  const onCancle = () => {
    toggleEditMode();
    setValue(data);
  };

  return (
    <tr>
      <td>{title}</td>
      <td>{data}</td>

      {editMode && (
        <td>
          <button onClick={onSave}>Save</button>
          <input type="text" defaultValue={value} onChange={onChange} />
          <button onClick={onCancle}>Cancle</button>
        </td>
      )}
      {!editMode && editable && (
        <td>
          <button onClick={toggleEditMode}>Edit</button>
        </td>
      )}
    </tr>
  );
}
