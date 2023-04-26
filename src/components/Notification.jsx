import React from "react";
import {useNavigate} from "react-router-dom";

const Notification = ({notifications, close}) => {
  const navigate = useNavigate();

  const dateDisplay = (dateInput) => {
    const date = new Date(dateInput);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const formattedDate = `${day >= 10 ? day : "0" + day}/${
      month >= 10 ? month : "0" + month
    }/${year} ${hour >= 10 ? hour : "0" + hour}:${
      minute >= 10 ? minute : "0" + minute
    }`;
    return formattedDate;
  };

  const navigateClick = (text) => {
    const fillInfor = text === "Please fill your personal information";
    const rented = text.includes("rented your car");
    const chat = text.includes("Payment success");
    const payment = text.includes("Please pay a rental");

    if (fillInfor) navigate("/profile?menu=me");
    if (rented) navigate("/profile?menu=car");
    if (chat) navigate("/chat");
    if (payment) navigate("/profile?menu=booking");
    close(false);
  };

  return (
    <div className="notification-container">
      <div className="header">Notification</div>
      {notifications.length ? (
        <div className="noti-wrapper">
          {notifications
            .slice(0)
            .reverse()
            .map((notification, index) => (
              <div
                className={notification.isRead ? "noti-box" : "noti-box unread"}
                key={notification._id}
                onClick={() => navigateClick(notification.text)}
              >
                <div className="no">{index + 1}</div>
                <div>
                  <div className="each-notification">{notification.text}</div>
                  <div className="show-date">
                    {dateDisplay(notification.createdAt)}
                  </div>
                </div>
                {!notification.isRead && <div></div>}
              </div>
            ))}
        </div>
      ) : (
        <div className="noti-wrapper">There is no notification.</div>
      )}
    </div>
  );
};

export default Notification;
