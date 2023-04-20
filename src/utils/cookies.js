// Helper function to get the value of a cookie by name
export const getCookie = (name) => {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    .split("=")[1]; // get the value after "auth="
  const userId = decodeURIComponent(cookieValue);

  const parsedCookie = JSON.parse(userId.slice(2)); // remove the 'j:' prefix
  const newUserId = parsedCookie.userID || parsedCookie.username; // "640cfd781bd74dc9f57b3ebc"
  // const userId = JSON.parse(decodeURIComponent(cookieValue)).userID;
  return newUserId;
};

// Helper function to delete a cookie by name
export const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=monkeydcar.website; secure; samesite=none;`;
};

// Helper function to check if a cookie exists by name
export const cookieExists = (name) => {
  return document.cookie.split(";").some((cookie) => {
    return cookie.trim().startsWith(name + "=");
  });
};
