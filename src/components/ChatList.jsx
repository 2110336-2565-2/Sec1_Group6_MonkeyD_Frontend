import React, {useEffect, useState} from "react";
import axios from "axios";
const ChatList = ({userId, setChatId, setChatWith}) => {
  const [chatList, setChatList] = useState([]);

  const handleChoose = (chatId, chatWith) => {
    setChatWith(chatWith);
    setChatId(chatId);
  };

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/user/chatRooms/${userId}`,
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
      {chatList && chatList !== [] ? (
        <>
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
