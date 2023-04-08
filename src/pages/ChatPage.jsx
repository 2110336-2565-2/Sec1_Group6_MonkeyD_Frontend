import React, {useEffect, useState} from "react";
import ChatBox from "../components/ChatBox";
import ChatList from "../components/ChatList";
const ChatPage = () => {
  const [chatId, setChatId] = useState("");
  const [chatWith, setChatWith] = useState("");
  const user = sessionStorage.getItem("username");
  const userId = sessionStorage.getItem("user_id");

  return (
    <div className="chatpage-container">
      <ChatList
        userId={userId}
        setChatId={setChatId}
        setChatWith={setChatWith}
      />
      <ChatBox
        chatId={chatId}
        user={user}
        userId={userId}
        chatWith={chatWith}
      />
    </div>
  );
};

export default ChatPage;
