import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import ProfileStatusTab from "./ProfileStatusTab";
import ProfileSearchBar from "./ProfileSearchBar";

const PaymentHistory = () => {
  const statusList = ["charge", "transfer"];
  const [status, setStatus] = useState("charge");
  const [trans, setTrans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const searchRef = useRef();

  const fetchTrans = async () => {
    const id = sessionStorage.getItem("user_id");
    const params = {
      renterID: id,
      search: searchRef.current.value,
    };

    try {
      setIsLoading(true);
      const res = await axios.get(`http://localhost:8080/payment`, {
        params,
        withCredentials: true,
      });
      // console.log(res.data.payments);
      setTrans(res.data.payments);
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
        {isLoading || trans.length === 0 ? (
          <div className="no-result">No result</div>
        ) : (
          trans?.map((tran, index) => {
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
