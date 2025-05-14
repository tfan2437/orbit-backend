import Chat from "../models/chat.model.js";

export const getChats = async (req, res) => {
  try {
    const { uid } = req.params;

    if (!uid) {
      return res.status(400).json({
        success: false,
        chats: {
          today: [],
          yesterday: [],
          previous: [],
        },
      });
    }

    const chats = await Chat.find({ uid });
    if (!chats) {
      return res.status(404).json({
        success: false,
        chats: {
          today: [],
          yesterday: [],
          previous: [],
        },
      });
    }

    const formatedChats = chats.map((chat) => {
      return {
        chat_id: chat.chat_id,
        title: chat.title,
        updatedAt: chat.updatedAt,
      };
    });

    console.log(formatedChats);

    // Get today's date at 00:00:00
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get yesterday's date at 00:00:00
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Categorize chats based on their updatedAt timestamp
    const todayChats = formatedChats.filter((chat) => {
      const chatDate = new Date(chat.updatedAt);
      return chatDate >= today;
    });

    const yesterdayChats = formatedChats.filter((chat) => {
      const chatDate = new Date(chat.updatedAt);
      return chatDate >= yesterday && chatDate < today;
    });

    const previousChats = formatedChats.filter((chat) => {
      const chatDate = new Date(chat.updatedAt);
      return chatDate < yesterday;
    });

    res.status(200).json({
      success: true,
      chats: {
        today: todayChats,
        yesterday: yesterdayChats,
        previous: previousChats,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      chats: {
        today: [],
        yesterday: [],
        previous: [],
      },
    });
  }
};

export const createChat = async (req, res) => {
  try {
    const { chat_id } = req.params;
    const { uid, title, contents } = req.body;

    // Validate required fields
    if (!chat_id || !uid || !title || !contents) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Check if user already exists
    const existingChat = await Chat.findOne({ chat_id });
    if (existingChat) {
      return res.status(409).json({
        success: false,
        message: "Chat with this chat_id already exists",
      });
    }

    // Create new user with defaults
    const chatData = {
      chat_id,
      uid,
      title,
      contents,
    };

    const chat = new Chat(chatData);
    await chat.save();

    // Return success response
    res.status(200).json({
      success: true,
      message: "Chat created successfully",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while creating chat",
      error: error.message,
    });
  }
};

export const getChat = async (req, res) => {
  try {
    const { chat_id } = req.params;

    if (!chat_id) {
      return res.status(400).json({
        success: false,
        contents: [],
        message: "Chat ID is required",
      });
    }

    const chat = await Chat.findOne({ chat_id });
    if (!chat) {
      return res.status(404).json({
        success: false,
        contents: [],
        message: "Chat not found",
      });
    }

    res.status(200).json({
      success: true,
      contents: chat.contents,
      message: "Chat retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      contents: [],
      message: error.message,
    });
  }
};

export const updateChat = async (req, res) => {
  try {
    const { chat_id } = req.params;
    const { uid, title, contents } = req.body;

    if (!chat_id || !contents || !uid || !title) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const chat = await Chat.findOne({ chat_id });
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    chat.contents.push(...contents);

    await chat.save();

    res.status(200).json({
      success: true,
      chat: chat,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while updating chat",
      error: error.message,
    });
  }
};
