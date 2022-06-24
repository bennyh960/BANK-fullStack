import React, { useEffect, useState } from "react";
import "./accountOne.css";
import serverApi from "../api/api.js";
export default function AccountOne({ id }) {
  const [accountData, setAccountData] = useState("");
  useEffect(() => {
    const getAccountAPi = async () => {
      const { data } = await serverApi.oneAccount.get(`/${id}`);
      setAccountData(data);
    };
    getAccountAPi();
  }, [setAccountData]);

  return (
    <div>
      <div>
        <h1>{accountData.firstName + " " + accountData.lastName}</h1>
        <img src="" alt="" width={300} />
      </div>
    </div>
  );
}
