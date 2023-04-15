import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";

const ChatList = ({userId, setChatId, setChatWith}) => {
  const [chatList, setChatList] = useState([]);
  const [chatSelected, setChatSelected] = useState(0);

  const handleChoose = (chatId, chatWith, index) => {
    setChatWith(chatWith);
    setChatId(chatId);
    setChatSelected(index);
  };

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get("http://localhost:8080/csrf-token", {
          withCredentials: true,
        });
        Cookies.set("csrf-token", response.data.token);
      } catch (error) {
        console.error("Failed to fetch CSRF token", error);
      }
    };

    const fetchChatList = async () => {
      await fetchCsrfToken();
      try {
        const res = await axios.get(
          `http://localhost:8080/api/user/chatRooms/${userId}`,
          {
            withCredentials: true,
          }
        );
        setChatList(res.data.chats);
        console.log(res.data.chats);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChatList();
    return;
  }, []);

  return (
    <div className="chatlist-container">
      <h2 className="header">Chats</h2>
      <div className="chatlist">
        {chatList && chatList !== [] ? (
          <>
            {chatList.map((chat, index) => {
              return (
                <div
                  className={`chat ${index === chatSelected ? "selected" : ""}`}
                  key={chat._id}
                  onClick={() => handleChoose(chat._id, chat.name, index)}
                >
                  {chat.name}
                </div>
              );
            })}
          </>
        ) : (
          <div className="no-chat">No Chat</div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
