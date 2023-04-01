import React, {useState} from "react";
import Script from "react-load-script";
import axios from "axios";

let OmiseCard;

const PaymentPage = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const handleLoadScript = () => {
    let OmiseCard = window.OmiseCard;
    OmiseCard.configure({
      publicKey: process.env.REACT_APP_OMISE_PUBLIC_KEY,
      currency: "THB",
      frameLabel: "Monkey Car Rent",
      submitLabel: "Pay Now",
      buttonLabel: "Pay with Omise",
    });
    setScriptLoaded(true);
  };
  const omiseCardHandler = async () => {
    OmiseCard.open({
      amount: "1000000",
      onCreateTokenSuccess: (token) => {
        const id = sessionStorage.getItem("user_id");
        axios
          .post(
            `http://localhost:8080/payment/charge/${id}`,
            {
              email: "borntodev@gmail.com",
              name: "Borntodev",
              amount: "10000",
              token: token,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          )
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
      },
      onFormClosed: () => {},
    });
  };
  const creditCardConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: "credit_card",
      otherPaymentMethods: [],
    });
    OmiseCard.configureButton("#credit-card");
    OmiseCard.attach();
  };

  const handleClick = (e) => {
    e.preventDefault();
    creditCardConfigure();
    omiseCardHandler();
  };

  return (
    <div className="payment-container">
      <Script url="https://cdn.omise.co/omise.js" onLoad={handleLoadScript} />
      <form>
        <button
          id="credit-card"
          type="button"
          onClick={handleClick}
          disabled={!scriptLoaded}
        >
          ชำระเงินด้วยบัตรเครดิต
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
