// utils/crypto.js
import CryptoJS from "crypto-js";
import Config from "../assets/configs/configs.json";

const secretKey = Config.JWT_SECRET; // Replace this with a strong secret key

export const encryptMessage = (message) => {
  const encryptedMessage = CryptoJS.AES.encrypt(message, secretKey);
  return encryptedMessage.toString();
};

export const decryptMessage = (encryptedMessage) => {
  const decryptedMessage = CryptoJS.AES.decrypt(encryptedMessage, secretKey);
  return decryptedMessage.toString(CryptoJS.enc.Utf8);
};
