import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";

const ChatList = ({userId, setChatId, setChatWith}) => {
  const [chatList, setChatList] = useState([]);

  const handleChoose = (chatId, chatWith) => {
    setChatWith(chatWith);
    setChatId(chatId);
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
      } catch (error) {
        console.error(error);
      }
    };

    fetchChatList();
    return;
  }, []);

  return (
    <div className="chatlist-container">
      {chatList && chatList !== [] ? (
        <>
          <h2>Chat list</h2>
          <div className="list">
            {chatList.map((chat) => {
              return (
                <button onClick={() => handleChoose(chat._id, chat.name)}>
                  chat with {chat.name}
                </button>
              );
            })}
          </div>
        </>
      ) : (
        "no chat"
      )}
    </div>
  );
};

export default ChatList;
