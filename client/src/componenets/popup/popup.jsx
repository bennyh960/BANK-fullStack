import "./popup.css";
// import React from "react";
import { useState } from "react";
import serverApi from "../api/api";
// import formData from "form-data";

export default function Popup({ isPopUpBtn }) {
  const [newUser, setNewUser] = useState({});
  const [error, setError] = useState({ isError: false, message: "Error Message" });
  // const [image, setImg] = useState({});

  const handleInput = (target) => {
    setNewUser({ ...newUser, [target.name]: target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      serverApi.createNewUser.post("/", newUser).catch((e) => {
        setError({ isError: true, message: e.response.data });
        // console.log(e.response.data);
        setTimeout(() => {
          setError({ isError: false, message: "" });
        }, 2000);
      });
    } catch (e) {
      console.log(e.message);
    }
  };
  const showHidePopUp = () => {
    isPopUpBtn();
  };

  // !img
  const onChangeImg = () => {
    console.log("image test");
  };

  return (
    <div className="popup-container">
      <form
        className="popup-form"
        onSubmit={(e) => handleSubmit(e)}
        method="POST"
        action="http://localhost:5000/users/"
        encType="multipart/form-data"
      >
        <h3>Adding New </h3>
        <InputLabel
          category="Passport ID"
          idp="passportID"
          type="number"
          namep="passportID"
          handleInputProp={handleInput}
        />
        <InputLabel category="First Name" idp="firstName" type="text" namep="firstName" handleInputProp={handleInput} />
        <InputLabel category="Last Name" idp="lastName" type="text" namep="lastName" handleInputProp={handleInput} />
        <InputLabel category="Email" idp="email" type="email" namep="email" handleInputProp={handleInput} />
        <InputLabel category="Cash" idp="cash" type="number" namep="cash" handleInputProp={handleInput} />
        <InputLabel category="Credit" idp="credit" type="number" namep="credit" handleInputProp={handleInput} />
        <InputLabel category="password" idp="password" type="text" namep="password" handleInputProp={handleInput} />
        <div>
          <label htmlFor="image">Image: </label>
          <input category="image" id="image" type="file" name="image" onChange={onChangeImg} accept="image/*" />
        </div>
        <div>
          <button
            className="ui primary button "
            onClick={() => {
              let emptyField = false;
              Object.keys(newUser).forEach((k) => {
                if (!k) emptyField = true;
              });
              if (!emptyField) {
                setTimeout(() => {
                  showHidePopUp();
                }, 10);
              }
            }}
          >
            Save
          </button>
          <button className="ui button" onClick={() => showHidePopUp()}>
            Cancel
          </button>
        </div>
      </form>
      {error.isError && <Error message={error.message} />}
    </div>
  );
}

function InputLabel({ category, idp, type, handleInputProp, namep }) {
  const [value, setValue] = useState("");
  const handleInput = (target) => {
    setValue(target.value);
    handleInputProp(target);
  };
  return (
    <div className="popup-input-label-container">
      <label htmlFor={idp}>{category}: </label>
      <input type={type} id={idp} name={namep} value={value} onChange={(e) => handleInput(e.target)} required />
    </div>
  );
}

function Error({ message }) {
  return (
    <div className="error-message">
      <h3>{message}</h3>
    </div>
  );
}
