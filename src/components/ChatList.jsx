import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Config from "../assets/configs/configs.json";
import { dateDisplay } from "../utils/dateDisplay";

const ChatList = ({userId, setChatId, setChatWith}) => {
  const [chatList, setChatList] = useState([]);
  const [chatSelected, setChatSelected] = useState(-1);

  const handleChoose = (chatId, chatWith, index) => {
    setChatWith(chatWith);
    setChatId(chatId);
    setChatSelected(index);
  };

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get(`${Config.BACKEND_URL}/csrf-token`, {
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
          `${Config.BACKEND_URL}/api/user/chatRooms/${userId}`,
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
      <h2 className="header">Chats</h2>
      <div className="chatlist">
        {chatList && chatList !== [] ? (
          <>
            {chatList.map((chat, index) => {
              const {
                _id,
                name,
                matchID: {
                  carID: {brand, model, license_plate},
                },
              } = chat;
              return (
                <div
                  className={`chat ${index === chatSelected ? "selected" : ""}`}
                  key={_id}
                  onClick={() => handleChoose(_id, name, index)}
                >
                  <h3>{name}</h3>
                  <p>{`${brand} · ${model}`}</p>
                  <p>{license_plate}</p>
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
