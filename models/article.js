import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: { type: String },
    image: { type: String },
    body: {
      type: [
        {
          type: {
            type: String,
            required: true,
          },
          value: {
            type: String,
            required: true,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Article", articleSchema);
