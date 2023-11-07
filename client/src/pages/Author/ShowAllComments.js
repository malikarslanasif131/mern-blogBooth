import React, { useEffect, useState } from "react";
import DashboardPage from "./DashboardPage";
import axios from "axios";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";

const ShowAllComments = () => {
  const [comments, setComments] = useState("");
  const [page, setPage] = useState(1);
  const [dataLength, setDataLength] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [deleteComment, setDeleteComment] = useState(false);
  // const token = localStorage.getItem("token").slice(1, -1);

  // const [blogTitle, setBlogTitle] = useState("");
  // const [commentId, setCommentId] = useState("");

  // useEffect(() => {
  //   async function fetchBlogTitle() {
  //     await axios
  //       .get(`http://localhost:8080/api/blog/title/${commentId}`)
  //       .then((res) => {
  //         console.log(res.data.title, "res.data.title");
  //         setBlogTitle(res.data.title);
  //       });
  //   }
  //   fetchBlogTitle();
  // }, []);

  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:8080/api/blog/delete-comment/${id}`)
      .then((res) => {
        setDeleteComment(deleteComment ? false : res.data.success);
      });
  };

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`http://localhost:8080/api/blog/show-all-comments?page=${page}`)
        .then((res) => {
          // console.log(res.data.comment, "res.data.comment");
          setComments(res.data.comment);
          setDataLength(res.data.commentCount);
          setTotalPages(Math.ceil(res.data.commentCount / 6));
        });
    }
    fetchData();
  }, [page, deleteComment]);

  function handlePaginationClick(newPage) {
    window.scrollTo(0, 0);
    setPage(newPage);
  }

  const paginationButtons = [];

  for (let i = 0; i <= totalPages + 1; i++) {
    if (i === 0) {
      paginationButtons.push(
        <button
          key={"first"}
          className={`btn btn-secondary mx-3 px-4 ${
            page === 1 ? "disabled" : ""
          }`}
          onClick={() => {
            handlePaginationClick(1);
          }}
          disabled={page === 1}
        >
          <i className="fa-solid fa-less-than"></i>
        </button>
      );
    } else if (i === totalPages + 1) {
      paginationButtons.push(
        <button
          key={"last"}
          className={`btn btn-secondary mx-3 px-4 ${
            page === totalPages ? "disabled" : ""
          }`}
          onClick={() => {
            handlePaginationClick(totalPages);
          }}
          disabled={page === totalPages}
        >
          <i className="fa-solid fa-greater-than"></i>
        </button>
      );
    } else {
      paginationButtons.push(
        <button
          key={i}
          className={`btn btn-secondary mx-3 px-4 ${
            i === page ? "active" : ""
          }`}
          onClick={() => {
            handlePaginationClick(i);
          }}
        >
          {i}
        </button>
      );
    }
  }

  return (
    <DashboardPage>
      <div className="display-5 border-bottom py-3">
        All Comments
        <small className="mx-2 fs-5">({dataLength ? dataLength : "0"})</small>
        <small className="fs-6 float-end m-4 p-1">Page No. {page}</small>
      </div>

      {/* --------------Map Here---------------- */}

      {comments &&
        comments.map((comment, i) => {
          // setCommentId(comment._id);
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
            <div className="container" key={comment._id}>
              <div className="container">
                <div className="card my-3">
                  <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <Avatar
                          name={comment.username}
                          textSizeRatio={1.85}
                          size="30"
                          round={true}
                        />
                        <span className="mx-1 btn fs-4">
                          {comment.username}
                        </span>
                      </div>
                      <div className="">
                        <div className="mx-5 d-inline"></div>
                        <button
                          onClick={() => {
                            handleDelete(comment._id);
                          }}
                          className="btn"
                        >
                          <i className="fa-solid fa-trash fa-lg text-muted onHover-icons"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <blockquote className="blockquote mb-0">
                      <p className="mx-4">
                        <span className="text-muted me-3">Comment :</span>
                        {comment.comment}
                      </p>{" "}
                      <div className="mx-4">
                        <span className="text-muted me-3">Blog Title :</span>
                        <Link to={`/blogPage/${comment.blogId}`}>
                          {comment.blogTitle}
                        </Link>
                      </div>
                      <footer className="fs-6 mx-4">
                        <small className="fs-6 text-muted ">
                          {formattedDate}
                        </small>
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      <div className="d-flex justify-content-center mt-4">
        {paginationButtons}
      </div>
    </DashboardPage>
  );
};

export default ShowAllComments;
