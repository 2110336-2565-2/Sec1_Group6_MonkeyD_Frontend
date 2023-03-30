import React, {useEffect, useState} from "react";
import axios from "axios";

const BalancePage = () => {
  const [balance, setBalance] = useState(1234);

  useEffect(() => {
    // Get availabe balance
    const fetchBalance = async () => {
      try {
        // const id = sessionStorage.getItem("user_id");
        // const res = await axios.get(`http://localhost:8080/balance/`);
        // setBalance(res.data.balance);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBalance();
  }, [balance]);

  const depositHandler = () => {
    console.log("Deposit");
  };

  return (
    <div className="balance-page">
      <div className="wallet-container">
        <div className="head-wrap">
          <div className="header">Your Balance</div>
          <i className="fa-solid fa-wallet" />
        </div>
        <div className="balance-wrap">
          <div className="balance-value">฿ {balance}</div>
          <div className="btn-deposit" onClick={depositHandler}>
            <i className="fa-solid fa-money-bill-transfer" />
            Deposit
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalancePage;
