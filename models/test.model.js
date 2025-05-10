import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "User email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please use a valid email address",
      ],
    },
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    age: {
      type: Number,
      required: [true, "User age is required"],
      min: 1,
      max: 200,
    },
  },
  { timestamps: true }
);

// Email index is already created by unique:true in the schema
// No need for additional indexes in this schema

const Test = mongoose.model("Test", testSchema);

export default Test;
