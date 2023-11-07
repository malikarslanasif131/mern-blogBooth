import mongoose from "mongoose";
import Category from "./categoryModel.js";
import User from "./userModel.js";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "title is required"],
    },
    content: {
      type: String,
      required: [true, "content is require"],
    },
    path: {
      type: String,
      // required: [true, "path is require"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      // require: [true, "user id is required"],
    },
    comment: [
      {
        username: {
          type: String,
          // require: [true, "name is required for comment"],
        },
        comment: {
          type: String,
          // require: [true, "content is require for comment"],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      // required: true,
    },
    featurePost: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

blogSchema.index({ title: "text", content: "text" }); //search by title and content

export default mongoose.model("Blog", blogSchema);

// const blogModel = mongoose.model("Blog", blogSchema);

// export default blogModel;
