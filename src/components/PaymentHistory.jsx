import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import ProfileStatusTab from "./ProfileStatusTab";
import ProfileSearchBar from "./ProfileSearchBar";

const PaymentHistory = () => {
  const dummy = [
    {
      object: "charge",
      id: "chrg_test_5vbe71wgirsi7rhcd0l",
      amount: 2392000,
      currency: "THB",
      card: {
        object: "card",
        bank: "JPMORGAN CHASE BANK N.A.",
        brand: "Visa",
      },
      created_at: "2023-04-02T16:44:17Z",
      customer: "cust_test_5vbe71t90e3gljh10fl",
    },
    {
      object: "charge",
      id: "chrg_test_5vfdvftvghllihgfbfwc",
      amount: 1332000,
      currency: "THB",
      card: {
        object: "card",
        bank: "JPMORGAN CHASE BANK N.A.",
        brand: "Visa",
      },
      created_at: "2023-04-02T16:44:17Z",
      customer: "cust_test_5vbe71t90e3gljh10fl",
    },
    {
      object: "transfer",
      id: "trsf_test_5vbegf78lvduao443g1",
      amount: 85000,
      currency: "THB",
      recipient: "recp_test_5vbegf4zm01ekaqznam",
      bank_account: {
        object: "bank_account",
        brand: "Test Bank",
        bank_code: "test",
      },
      created_at: "2023-04-02T16:44:17Z",
    },
  ];
  const statusList = ["charge", "transfer"];
  const [status, setStatus] = useState("charge");
  const [trans, setTrans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const searchRef = useRef();

  const fetchTrans = async () => {
    const params = {
      ...(status !== "All" && {
        status: status,
      }),
      search: searchRef.current.value,
    };

    try {
      setIsLoading(true);
      const id = sessionStorage.getItem("user_id");
      //   const res = await axios.get(`http://localhost:8080/trans`, {
      //     params,
      //     withCredentials: true,
      //   });
      //   setTrans(res.data.trans);
      setTrans(dummy);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    fetchTrans();
  };

  useEffect(() => {
    fetchTrans();
  }, [status]);

  return (
    <div className="trans-approval-container">
      <ProfileStatusTab
        statusList={statusList}
        status={status}
        setStatus={setStatus}
      />
      <ProfileSearchBar searchRef={searchRef} handleSearch={handleSearch} />
      <div className="trans-approval-list">
        {isLoading || trans === [] || trans?.length === 0 ? (
          <div className="no-result">No result</div>
        ) : (
          trans?.map((tran, index) => {
            console.log(tran);
            let {
              object: type,
              id,
              amount,
              currency,
              card: {object, bank, brand} = {},
              created_at,
              customer,
            } = tran;
            created_at = Date(created_at);
            return (
              <div className="trans-approval" key={index}>
                <div className="header">
                  <h3>{`Transaction ID : ${id}`}</h3>
                </div>
                <h3>{`customer : ${customer}`}</h3>
                <h3>{`payment method : ${object} ${bank} ${brand}`}</h3>
                <h3>{`created at : ${created_at}`}</h3>
                <h3 className="amount">{`amount : ${amount} ${currency}`}</h3>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
export default PaymentHistory;
