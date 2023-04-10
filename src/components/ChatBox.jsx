import React, {useEffect, useState} from "react";
import io from "socket.io-client";
import {encryptMessage, decryptMessage} from "../utils/message.js";

const ChatBox = ({chatId, user, userId, chatWith}) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:8080", {
      query: {userId},
      withCredentials: true,
    });
    if (!!chatId) {
      setSocket(newSocket);
      newSocket.on("connect", () => {
        console.log(`Connected to server with socket ID: ${newSocket.id}`);
        newSocket.emit("join", {chatId, user});
      });
      newSocket.on("messages", (oldMessages) => {
        const decryptedOldMessages = oldMessages.map((message) => {
          if (message.systemMessage) {
            return message;
          }
          return {
            ...message,
            text: decryptMessage(message.text),
          };
        });
        setMessages(decryptedOldMessages);
      });
      newSocket.on("message", (newMessage) => {
        console.log(`Encrypted message received: ${newMessage.text}`);
        const decryptedMessage = decryptMessage(newMessage.text);
        setMessages((messages) => [
          ...messages,
          {...newMessage, text: decryptedMessage},
        ]);
      });
      newSocket.on("user_joined", ({user}) => {
        console.log(`${user} joined the room`);
        setMessages((messages) => [
          ...messages,
          {text: `${user} in the chat`, systemMessage: true},
        ]);
      });
    }
  }, [chatId]);

  useEffect(() => {
    return () => {
      if (socket) {
        console.log("====================================");
        socket.disconnect();
      }
    };
  }, []); // Pass an empty dependency array, so this useEffect only runs on component unmount.

  const handleSubmit = (event) => {
    event.preventDefault();
    if (socket && message) {
      const encryptedMessage = encryptMessage(message);
      socket.emit("message", {chatId, user, text: encryptedMessage});
      setMessage("");
    }
  };

  return (
    <div className="chatbox-container">
      <h1>Chat Room: {chatWith}</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            {message.systemMessage ? (
              <em>{message.text}</em>
            ) : (
              <>
                <strong>{message.user}:</strong> {message.text}
              </>
            )}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBox;
