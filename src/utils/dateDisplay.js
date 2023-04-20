export const dateDisplay = (dateInput) => {
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
