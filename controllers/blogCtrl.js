import mongoose from "mongoose";
import blogModel from "../models/blogModel.js";
import userModel from "../models/userModel.js";
import Category from "../models/categoryModel.js";

//GET ALL BLOGS
export const getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel
      .find({})
      .sort({ createdAt: -1 })
      .populate("user")
      .populate("category");
    if (!blogs || blogs.length === 0) {
      return res.status(200).send({
        success: false,
        message: "No Blogs Found",
      });
    }
    // console.log(blogs);
    const popularPosts = blogs.sort((a, b) => b.likes - a.likes).slice(0, 5); // assuming you want to get the top 5 popular posts based on likes
    // console.log(popularPosts);

    const recentPosts = blogs.slice(0, 7); // assuming you want to get the top 5 recent posts
    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: "Recent Blogs lists",
      blogs: recentPosts,
      popularPosts: popularPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while getting recent Blogs",
      error,
    });
  }
};
//GET Pagination BLOGS
export const getBlogController = async (req, res) => {
  try {
    const blogs = await blogModel
      .find({})
      .sort({ createdAt: -1 }) // sort by createdAt in descending order
      .populate("category");

    if (!blogs || blogs.length === 0) {
      return res.status(200).send({
        success: false,
        message: "No Blogs Found",
      });
    }

    // console.log(blogs);
    const { page } = req.query;
    const perPage = 6; // number of posts to return per page
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedPosts = blogs.slice(startIndex, endIndex);

    const popularPosts = blogs.sort((a, b) => b.likes - a.likes).slice(0, 5); // assuming you want to get the top 5 popular posts based on likes

    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: "Recent Blogs lists",
      blogs: paginatedPosts,
      popularPosts: popularPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while getting recent Blogs",
      error,
    });
  }
};
// GET Feature Post
export const getFeatureBlogController = async (req, res) => {
  try {
    const blog = await blogModel
      .findOne({ featurePost: true })
      .populate("user")
      .populate("category")
      .exec();

    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "No feature post found",
      });
    }

    // console.log(blog);

    return res.status(200).send({
      success: true,
      blogCount: 1,
      message: "Recent feature post",
      blogs: [blog],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error while getting feature post",
    });
  }
};
// -------------------------------------------------------------------------------------------------------------------------------------
//GET ALL Comments
// export const getAllCommentController = async (req, res) => {
//   try {
//     const blogs = await blogModel.find({}).sort({ createdAt: -1 });
//     if (!blogs || blogs.length === 0) {
//       return res.status(200).send({
//         success: false,
//         message: "No Comment Found",
//       });
//     }
//     const comment = blogs
//       .map((blog) => {
//         return blog.comment;
//       })
//       .filter((arr) => arr.length > 0);
//     // console.log(comment, "comment after fillter");
//     const { page } = req.query;
//     const perPage = 5; // number of posts to return per page
//     const startIndex = (page - 1) * perPage;
//     const endIndex = startIndex + perPage;
//     const paginatedComments = comment.slice(startIndex, endIndex);
//     // console.log(comment, "comment after slice");

//     const totalComments = comment.reduce((count, innerArray) => {
//       return count + innerArray.length;
//     }, 0);
//     // console.log(totalComments, "totalComments");

//     return res.status(200).send({
//       success: true,
//       commentCount: totalComments,
//       message: "Recent Comment lists",
//       comment: paginatedComments,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "Error while getting Comments",
//       error,
//     });
//   }
// };

// --------------------------------------------Start Of Comment With Blog Title-------------------------------------------
export const getAllCommentController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).sort({ createdAt: -1 });

    if (!blogs || blogs.length === 0) {
      return res.status(200).send({
        success: false,
        message: "No Comment Found",
      });
    }

    const comments = blogs.flatMap((blog) => blog.comment);

    const { page } = req.query;
    const perPage = 6; // number of comments to return per page
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedComments = comments.slice(startIndex, endIndex);

    const totalComments = comments.length;

    const commentWithBlogTitles = await Promise.all(
      paginatedComments.map(async (comment) => {
        const blog = await blogModel.findOne(
          { "comment._id": comment._id },
          { _id: 1, title: 1 }
        );
        return { ...comment._doc, blogId: blog._id, blogTitle: blog.title };
      })
    );

    return res.status(200).send({
      success: true,
      commentCount: totalComments,
      message: "Recent Comment lists",
      comment: commentWithBlogTitles,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while getting Comments",
      error,
    });
  }
};

// --------------------------------------------End Of Comment With Blog Title-------------------------------------------
// --------------------------------------------get all  Comment array  -------------------------------------------
// export const getAllCommentController = async (req, res) => {
//   try {
//     const blogs = await blogModel.find({}).sort({ createdAt: -1 });
//     // const blogs = await blogModel.find({}).sort({ "comment.createdAt": -1 });

//     if (!blogs || blogs.length === 0) {
//       return res.status(200).send({
//         success: false,
//         message: "No Comment Found",
//       });
//     }
//     // const comments = blogs.flatMap((blog) => blog.comment);
//     const comments = blogs
//       .flatMap((blog) => blog.comment)
//       .sort((a, b) => b.createdAt - a.createdAt);

//     const { page } = req.query;
//     const perPage = 6; // number of comments to return per page
//     const startIndex = (page - 1) * perPage;
//     const endIndex = startIndex + perPage;
//     const paginatedComments = comments.slice(startIndex, endIndex);

//     const totalComments = comments.length;

//     return res.status(200).send({
//       success: true,
//       commentCount: totalComments,
//       message: "Recent Comment lists",
//       comment: paginatedComments,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "Error while getting Comments",
//       error,
//     });
//   }
// };
// --------------------------------------------end get all  Comment array  -------------------------------------------

//Create Blog
// export const createBlogController = async (req, res) => {
//   // console.log(req.file.path, 33);
//   const { title, content, category, featurePost } = req.body;
//   const path = req.file.path;
//   const user = req.user._id;
//   console.log(user);
//   try {
//     //validation
//     if (!title || !path || !category) {
//       return res.status(401).send({
//         success: false,
//         message: "Please Provide ALl Fields",
//       });
//     }

//     const newBlog = new blogModel({
//       title,
//       content,
//       path,
//       category,
//       featurePost,
//       user,
//     });
//     // const session = await mongoose.startSession();
//     // session.startTransaction();
//     // await newBlog.save({ session });
//     // exisitingUser.blogs.push(newBlog);
//     // await exisitingUser.save({ session });
//     // await session.commitTransaction();
//     await newBlog.save();

//     console.log(newBlog);
//     return res.status(201).send({
//       success: true,
//       message: "Blog Created!",
//       newBlog,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).send({
//       success: false,
//       message: "Error WHile Creting blog",
//       error,
//     });
//   }
// };

//Create Blog
export const createBlogController = async (req, res) => {
  const { title, content, category, featurePost } = req.body;
  const path = req.file.path;
  // const user = req.user._id; // use req.user._id to get the user ID
  // console.log(user);
  try {
    //validation
    if (!title || !path || !category) {
      return res.status(401).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    const newBlog = new blogModel({
      title,
      content,
      path,
      category,
      featurePost,
      // user,
    });
    await newBlog.save();

    console.log(newBlog);
    return res.status(201).send({
      success: true,
      message: "Blog Created!",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Creating blog",
      error,
    });
  }
};

//Update Blog
export const updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, featurePost } = req.body;
    const path = req.file ? req.file.path : "";
    // console.log(req.file);

    // Only update fields that were changed on the frontend
    const updatedFields = {};
    if (title) updatedFields.title = title;
    if (content) updatedFields.content = content;
    if (category) updatedFields.category = category;
    if (path) updatedFields.path = path;
    if (featurePost) updatedFields.featurePost = featurePost;

    const updatedBlog = await blogModel.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });
    return res.status(200).send({
      success: true,
      message: "Blog Updated!",
      updatedBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error WHile Updating Blog",
      error,
    });
  }
};

//SIngle Blog
export const getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "blog not found with this is",
      });
    }
    return res.status(200).send({
      success: true,
      message: "fetch single blog",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error while getting single blog",
      error,
    });
  }
}; //SIngle Blog Comments
export const addCommentBlogByIdController = async (req, res) => {
  const { name, comment } = req.body;
  const { id } = req.params;

  try {
    // validation
    if (!name || !comment) {
      return res.status(401).send({
        success: false,
        message: "Please fill in all fields.",
      });
    }

    // retrieve the blog post by its ID
    const blog = await blogModel.findById(id);

    // add the new comment to the blog post's comments array
    blog.comment.push({ username: name, comment });

    // save the updated blog post object to the database
    await blog.save();

    const updatedBlog = await blogModel.findById(id);

    return res.status(200).send({
      success: true,
      message: "Comment added successfully!",
      blog: updatedBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while creating comment",
      error,
    });
  }
};

//Add Likes
export const addLikesBlogByIdController = async (req, res) => {
  try {
    // retrieve the blog post by its ID
    const like = await blogModel.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Like successfully!",
      like,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while creating comment",
      error,
    });
  }
};
//get Likes
export const getLikesBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    // retrieve the blog post by its ID
    const like = await blogModel.findById(id);
    return res.status(200).send({
      success: true,
      message: "Likes are There!",
      like,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while Getting Likes",
      error,
    });
  }
};

//Delete Blog
export const deleteBlogController = async (req, res) => {
  try {
    const blog = await blogModel
      // .findOneAndDelete(req.params.id)
      .findByIdAndDelete(req.params.id);
    // .populate("user");
    // await blog.user.blogs.pull(blog);
    // await blog.user.save();
    return res.status(200).send({
      success: true,
      message: "Blog Deleted!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Erorr WHile Deleteing BLog",
      error,
    });
  }
};

// ------------------------======================================================
//Delete Comment
export const deleteCommentController = async (req, res) => {
  try {
    const blog = await blogModel.findOneAndUpdate(
      { "comment._id": req.params.id },
      { $pull: { comment: { _id: req.params.id } } },
      { new: true }
    );
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Comment deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while deleting comment",
      error,
    });
  }
};

//GET USER BLOG
export const userBlogControlller = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs");

    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "blogs not found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "user blogs",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error in user blog",
      error,
    });
  }
};

// Search Controller

// export const searchBlogByCategoryControlller = async (req, res) => {
//   try {
//     const blogs = await blogModel
//       .find({})
//       .sort({ createdAt: -1 })
//       .populate("category");
//     if (!blogs || blogs.length === 0) {
//       return res.status(200).send({
//         success: false,
//         message: "This Category has No Blogs",
//       });
//     }
//     // console.log(blogs);
//     const { page } = req.query;
//     const perPage = 7; // number of posts to return per page
//     const startIndex = (page - 1) * perPage;
//     const endIndex = startIndex + perPage;
//     const paginatedPosts = blogs.slice(startIndex, endIndex);
//     return res.status(200).send({
//       success: true,
//       BlogCount: blogs.length,
//       message: "Blogs by category lists",
//       blogs: paginatedPosts,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).send({
//       success: false,
//       message: "Erorr While getting blog by category",
//       error,
//     });
//   }
// };

export const searchBlogByCategoryControlller = async (req, res) => {
  try {
    // const { id } = req.params;
    const { page, category_id } = req.query;
    const perPage = 7; // number of posts to return per page
    const startIndex = (page - 1) * perPage;

    const blogs = await blogModel
      .find({ category: category_id })
      .sort({ createdAt: -1 })
      .populate({
        path: "category",
        select: "name -_id",
        model: "Category",
      })
      .skip(startIndex)
      .limit(perPage);

    if (!blogs || blogs.length === 0) {
      return res.status(200).send({
        success: false,
        message: "This Category has No Blogs",
      });
    }

    const totalCount = await blogModel.countDocuments({
      category: category_id,
    });

    return res.status(200).send({
      success: true,
      BlogCount: totalCount,
      message: "Blogs by category lists",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While getting blog by category",
      error,
    });
  }
};

// Search Controller
export const searchBarController = async (req, res) => {
  const { term } = req.query;

  try {
    const results = await blogModel.find({
      $or: [
        { title: { $regex: `${term}`, $options: "i" } },
        { content: { $regex: `${term}`, $options: "i" } },
      ],
    });
    return res.status(200).send({
      success: true,
      BlogCount: results.length,
      message: "Search Blogs by Search Bar Term",
      blogs: results,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Searching Blogs by Search Bar Term",
      error,
    });
  }
};

// both get Post and searchbar

export const blogController = async (req, res) => {
  try {
    const { page, term } = req.query;
    const perPage = 9; // number of posts to return per page
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    const filter = term
      ? {
          $or: [
            { title: { $regex: `${term}`, $options: "i" } },
            { content: { $regex: `${term}`, $options: "i" } },
          ],
        }
      : {};

    const blogs = await blogModel
      .find(filter)
      .sort({ createdAt: -1 }) // sort by createdAt in descending order
      .populate("category");

    if (!blogs || blogs.length === 0) {
      return res.status(200).send({
        success: false,
        message: "No Blogs Found",
      });
    }

    const paginatedPosts = blogs.slice(startIndex, endIndex);

    const popularPosts = blogs.sort((a, b) => b.likes - a.likes).slice(0, 5); // assuming you want to get the top 5 popular posts based on likes

    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: term ? "Search Blogs by Search Bar Term" : "Recent Blogs lists",
      blogs: paginatedPosts,
      popularPosts: popularPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: term
        ? "Error While Searching Blogs by Search Bar Term"
        : "Error while getting recent Blogs",
      error,
    });
  }
};

// Get Blog Title by Comment Id

export const getBlogTitleCommentByController = async (req, res) => {
  try {
    const commentId = req.params.id;
    const blog = await blogModel.findOne({ "comment._id": commentId });
    // const comment = blog.comment.find((c) => c._id.equals(commentId));
    if (!blog) {
      return res.status(404).send({
        success: true,
        message: "Blog not found",
      });
    }

    const title = blog.title;
    return res.status(200).send({
      success: true,
      message: term ? "Search Blogs by Search Bar Term" : "Recent Blogs lists",
      title,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
