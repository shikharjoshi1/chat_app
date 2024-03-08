import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatPage = () => {
  const [chats, setChats] = useState([]);

  const fetchChats= async() => {
      
      const  res  = await axios.get('http://localhost:5000/api/chat');
      const chatData = res.data.chats;
      console.log(chatData);
       setChats(chatData);
    
  };  
    useEffect(() => {
      fetchChats();
    }, [])
    
  
    return ( 
    <div>
      {chats.map((chat) => (
      <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
    );
};

export default ChatPage;
