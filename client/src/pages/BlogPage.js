import { Link, useParams } from "react-router-dom";
import Comments from "../components/Comments";
import Layout from "../components/layout/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DisplayData from "./Author/dangerouslySetInnerHTML";
import LikeBlog from "../components/LikeBlog";
import Avatar from "react-avatar";

const BlogPage = () => {
  var { id } = useParams();
  const [blog, setBlog] = useState({ comment: [] }); // Initialize blog state as an object with a comment property that is an array
  const [comments, setComments] = useState("");
  const [likes, setLikes] = useState(0);

  const [showCommentForm, setShowCommentForm] = useState(false);

  const handleCommentButtonClick = () => {
    setShowCommentForm(!showCommentForm);
  };

  const handleLike = () => {
    axios
      .post(`http://localhost:8080/api/blog/get-blog/like/${id}`)
      .then((res) => {
        setLikes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  async function fetchData() {
    await axios
      .get(`http://localhost:8080/api/blog/get-blog/${id}`)
      .then((res) => {
        setBlog(res.data.blog);
      });
  }

  useEffect(() => {
    fetchData();
  }, [likes, comments, id]);

  const addComment = (comment) => {
    setBlog((prevBlog) => {
      return { ...prevBlog, comment: [...prevBlog.comment, comment] };
    });
    setComments(comment);
    fetchData();
  };
  const date = new Date(blog?.createdAt);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12 mx-auto bg-light">
            <h1
              className="m-3 p-3 text-capitalize"
              style={{ backgroundColor: "#e5e4e2  " }}
            >
              <DisplayData data={blog.title} />
            </h1>
            <p
              className="m-3 p-3 lh-base"
              style={{ backgroundColor: "#e5e4e2  " }}
            >
              {formattedDate}
              <small className="text-muted mx-3 float-end">
                <span className="mx-3">📨</span> 2 min to read
              </small>
            </p>
            <div
              id="content-main"
              className="left relative"
              style={{ height: "auto !important" }}
            >
              <div style={{ width: "85%" }} className=" mx-auto">
                <img
                  src={`/${blog?.path}`}
                  className="img-fluid"
                  alt="Blog Banner"
                />
              </div>

              <div
                className="m-3 p-3 lh-base"
                style={{ backgroundColor: "#e5e4e2  " }}
              >
                <DisplayData data={blog.content} />
              </div>
              <div
                className="m-3 p-3 lh-base"
                style={{ backgroundColor: "#e5e4e2  " }}
              >
                <LikeBlog handleLike={handleLike} proplikes={blog.likes} />
              </div>
            </div>

            {/* =============================================================== */}
            <div className="fs-2 my-3">
              Comments ( {blog && blog.comment.length} )
            </div>

            {blog.comment &&
              blog.comment.map((comment, index) => {
                const date = new Date(comment?.createdAt);
                const options = {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                };
                const formattedDate = date.toLocaleDateString("en-US", options);

                return (
                  <div className="card mt-3 col-md-9 mx-auto" key={index}>
                    <div className="card-header">
                      {/* <img
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                        src={`/${blog?.path}`}
                        className="me-4 img-fluid"
                        alt="User Profile"
                      /> */}

                      <Avatar
                        name={comment?.username}
                        textSizeRatio={1.5}
                        size="30"
                        round={true}
                      />
                      <span className="text-muted mx-2 pt-3">
                        {comment?.username}
                      </span>
                    </div>
                    <div className="card-body mb-0">
                      <blockquote className="blockquote mb-0">
                        <p>{comment?.comment}</p>
                        <footer className="blockquote-footer">
                          {formattedDate}
                        </footer>
                      </blockquote>
                      <div className="mb-0">
                        <button
                          onClick={() => handleCommentButtonClick()}
                          className="btn btn-link btn-sm"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            <div className="col-md-8  mx-auto">
              <Comments
                blogId={blog._id}
                addComment={addComment}
                showCommentForm={showCommentForm}
                setShowCommentForm={setShowCommentForm}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
