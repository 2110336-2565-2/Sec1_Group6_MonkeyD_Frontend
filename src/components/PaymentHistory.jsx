import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {PDFDownloadLink} from "@react-pdf/renderer";
import ProfileStatusTab from "./ProfileStatusTab";
import ProfileSearchBar from "./ProfileSearchBar";
import Receipt from "./Receipt";
import Config from "../assets/configs/configs.json";

const PaymentHistory = () => {
  const statusList = ["charge", "transfer"];
  const [status, setStatus] = useState("charge");
  const [trans, setTrans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest date");

  const searchRef = useRef();

  const filters = [
    "newest date",
    "oldest date",
    "highest price",
    "lowest price",
  ];

  const fetchTrans = async () => {
    const id = localStorage.getItem("user_id");
    const params = {
      renterID: id,
      search: searchRef.current.value,
    };

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${Config.BACKEND_URL}/payment/transaction/${id}`,
        {sortBy: sortBy},
        {
          // params,
          withCredentials: true,
        }
      );

      if (Object.keys(res.data).length > 0) {
        if (status === "charge") setTrans(res.data?.charges);
        else if (status === "transfer") setTrans(res.data?.transfers);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    fetchTrans();
  };
  const handleChangeSort = (event) => {
    setSortBy(event.target.value);
  };
  function formatDate(date) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "Asia/Bangkok",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  }
  useEffect(() => {
    fetchTrans();
  }, [status, sortBy]);

  return (
    <div className="trans-approval-container">
      <ProfileStatusTab
        statusList={statusList}
        status={status}
        setStatus={setStatus}
      />
      <ProfileSearchBar
        searchRef={searchRef}
        handleSearch={handleSearch}
        sortBy={sortBy}
        sortByList={filters}
        handleSortBy={handleChangeSort}
      />
      <div className="trans-approval-list">
        {isLoading ? (
          <div className="no-result">Loading</div>
        ) : trans.length === 0 ? (
          <div className="no-result">No result</div>
        ) : (
          trans?.map((tran, index) => {
            let {
              object: type,
              id,
              amount,
              currency,
              bank_account: {object, bank_code, brand} = {},
              card: {
                object: object_charge,
                bank: bank_charge,
                brand: brand_charge,
              } = {},
              created_at,
              recipient,
              customer,
            } = tran;
            created_at = formatDate(created_at);
            return (
              <div className="trans-approval" key={index}>
                <div className="header">
                  <h3>{`Transaction ID : ${id}`}</h3>
                </div>
                {status === "charge" && <h3>{`customer : ${customer}`}</h3>}
                {status === "transfer" && <h3>{`recipient : ${recipient}`}</h3>}
                {status === "charge" && (
                  <h3>{`card : ${object_charge} ${bank_charge} ${brand_charge}`}</h3>
                )}
                {status === "transfer" && (
                  <h3>{`payment method : ${object} ${bank_code} ${brand}`}</h3>
                )}

                <h3>{`created at : ${created_at}`}</h3>
                <div className="footer">
                  <PDFDownloadLink
                    document={<Receipt tran={tran} status={status} created_at={created_at} />}
                    fileName={`receipt-${id}.pdf`}
                  >
                    Download Receipt
                  </PDFDownloadLink>
                  <h3 className="amount">{`amount : ${
                    amount / 100
                  } ${currency}`}</h3>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
export default PaymentHistory;
