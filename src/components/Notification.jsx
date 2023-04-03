import React from "react";

const Notification = ({notifications}) => {
  const dateDisplay = (dateInput) => {
    const date = new Date(dateInput);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const formattedDate = `${day}/${month}/${year} ${hour}:${minute}`;
    return formattedDate;
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
        <div>There is no notification.</div>
      )}
    </div>
  );
};

export default Notification;
