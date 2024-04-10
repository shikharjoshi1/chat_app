import React, { useState, useEffect } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";

function MeetingList({ isOpen, onClose, user }) {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        console.log("User token:", user.token);
        const response = await axios.get(
          "http://localhost:5000/api/message/user-meetings",
          config
        );
        console.log("API response:", response.data);
        setMeetings(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching meetings:", error);
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchMeetings();
    }
  }, [isOpen, user]);

  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Meeting List</DrawerHeader>
        <DrawerBody>
          {loading ? (
            <Spinner />
          ) : (
            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>Meeting ID</Th>
                  <Th>Content</Th>
                  <Th>Sender</Th>
                </Tr>
              </Thead>
              <Tbody>
                {meetings.map((meeting) => (
                  <Tr key={meeting.meetingId}>
                    <Td>{meeting.meetingId}</Td>
                    <Td>{meeting.content}</Td>
                    <Td>{meeting.sender}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default MeetingList;
