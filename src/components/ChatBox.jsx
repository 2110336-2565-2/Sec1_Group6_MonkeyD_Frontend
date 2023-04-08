import React, {useEffect, useState} from "react";
import io from "socket.io-client";

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
        setMessages(oldMessages);
      });
      newSocket.on("message", (newMessage) => {
        console.log(`Message received: ${newMessage.text}`);
        setMessages((messages) => [...messages, newMessage]);
      });
      newSocket.on("user_joined", ({user}) => {
        console.log(`${user} joined the room`);
        setMessages((messages) => [
          ...messages,
          {text: `${user} in the chat`, systemMessage: true},
        ]);
      });
    }
    return () => {
      newSocket.disconnect();
    };
  }, [chatId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (socket && message) {
      socket.emit("message", {chatId, user, text: message});
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
