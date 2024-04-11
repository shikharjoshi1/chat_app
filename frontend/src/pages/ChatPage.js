import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChatState } from '../Context/ChatProvider';
import { Box, Flex, Spinner } from '@chakra-ui/react';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import MyChats from '../components/miscellaneous/MyChats';
import ChatBox from '../components/miscellaneous/ChatBox';

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500); 
  }, []);

  return loading ? (
    <>
      <Spinner size="xl" w={20} h={20} alignItems="center" margin="auto" />
    </>
  ) : (
    <div style={{ width: '100%' }}>
      {user && <SideDrawer />}
      <Flex justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Flex>
    </div>
  );
};

export default ChatPage;
