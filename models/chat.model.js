import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    chat_id: {
      type: String,
      required: true,
      unique: true,
    },
    uid: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    contents: [
      {
        role: {
          type: String,
          enum: ["user", "model"],
          required: true,
        },
        parts: {
          type: [mongoose.Schema.Types.Mixed],
          required: true,
          validate: {
            validator: function (parts) {
              return parts.every(
                (part) =>
                  part.text !== undefined ||
                  (part.inlineData &&
                    part.inlineData.data &&
                    part.inlineData.mimeType) ||
                  part.fileUrl !== undefined
              );
            },
            message:
              "Each part must contain either text, inlineData, or fileUrl",
          },
        },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
