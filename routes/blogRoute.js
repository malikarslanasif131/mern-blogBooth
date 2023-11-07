import express from "express";
import {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
  deleteCommentController,
  userBlogControlller,
  addCommentBlogByIdController,
  addLikesBlogByIdController,
  getLikesBlogByIdController,
  getAllCommentController,
  getFeatureBlogController,
  getBlogController,
  searchBlogByCategoryControlller,
  searchBarController,
  blogController,
  getBlogTitleCommentByController,
} from "../controllers/blogCtrl.js";
import { requireSignin } from "../middlewares/authMiddleware.js";

import multer from "multer";
const upload = multer({ dest: "uploads/" });

//router object
const router = express.Router();

//---------------------------blogs  routes--------------------------------------------------
// GET || all blogs
router.get("/show-all-posts", getAllBlogsController);

// GET || all blogs
router.get("/show-posts", getBlogController);

// show  Feature Post
router.get("/show-feature-post", getFeatureBlogController);

//POST || create blog
router.post("/create-blog", upload.single("file"), createBlogController);

//PUT || update blog
router.put("/update-blog/:id", upload.single("file"), updateBlogController);

//GET || SIngle Blog Details
router.get("/get-blog/:id", getBlogByIdController);

//DELETE || delete blog
router.delete("/delete-blog/:id", deleteBlogController);

//GET || user blog
router.get("/user-blog/:id", userBlogControlller);

//GET || Search blog
router.get("/search-by-category", searchBlogByCategoryControlller);

// Search Bar Blogs
router.get("/search", searchBarController);
router.get("/get-and-search", blogController);

//---------------------------Comments  routes--------------------------------------------------
// show all comments
router.get("/show-all-comments", getAllCommentController);

//Add Comments
router.post("/get-blog/add-comment/:id", addCommentBlogByIdController);

//DELETE || delete Comment
router.delete("/delete-comment/:id", deleteCommentController);

//Get || blog Title by Comment ID
router.get("/title/:id", getBlogTitleCommentByController);

//Add Likes
router.post("/get-blog/like/:id", addLikesBlogByIdController);
router.get("/get-blog/like/:id", getLikesBlogByIdController);

export default router;
