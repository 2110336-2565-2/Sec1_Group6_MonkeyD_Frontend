const ProfileStatusTab = ({statusList, status, setStatus}) => {
  return (
    <div className="profile-status-tab">
      {statusList &&
        statusList.map((item, i) => {
          return (
            <div
              key={item}
              className={item == status ? "status selected" : "status"}
              onClick={() => setStatus(item)}
            >
              {item}
            </div>
          );
        })}
    </div>
  );
};
export default ProfileStatusTab;
