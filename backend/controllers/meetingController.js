const asyncHandler = require("express-async-handler");
const Message = require("../Models/messageModel");
const User = require("../Models/userModel");
const Chat = require("../Models/chatModel");

const scheduleMeeting = asyncHandler(async (req, res) => {
    const { content, chatId } = req.body;
  
    if (!content || !chatId) {
      console.log("Invalid data passed. It should be in format of mm/dd/yyyy @ time");
      return res.sendStatus(400);
    }
  
    // Extract meeting details from the content
    const regex = /schedule meeting for (\d{1,2}\/\d{1,2}\/\d{4}) @ (\d{1,2}:\d{2})/i;
    const match = content.match(regex);
  
    if (!match) {
      return res.status(400).json({ message: "Invalid meeting schedule format" });
    }
  
    const meetingDate = match[1];
    const meetingTime = match[2];
  
    // Create a new message for the meeting
    const newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };
  
    try {
      const message = await Message.create(newMessage);
  
      // Update the chat's latestMessage with the meeting message
      await Chat.findByIdAndUpdate(chatId, {
        latestMessage: message,
      });
  
      // Return the created message
      res.json(message);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  module.exports = { scheduleMeeting };
      