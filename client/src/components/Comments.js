import axios from "axios";
import React, { useState } from "react";

const Comments = ({
  blogId,
  addComment,
  showCommentForm,
  setShowCommentForm,
}) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      comment: comment,
    };
    axios
      .post(
        `http://localhost:8080/api/blog/get-blog/add-comment/${blogId}`,
        data
      )
      .then((res) => {
        addComment(res.data.comment);
        setShowCommentForm(false);
      });

    setName("");
    setComment("");
  };
  const formStyle = {
    fontSize: showCommentForm ? "102%" : "100%",
    border: showCommentForm ? "3px solid #ccc" : "1px solid #ccc",
    boxShadow: showCommentForm ? "0 0 8px rgba(0, 0, 0, 0.3)" : "none",
    transition: "box-shadow 0.3s ease-out",
  };

  return (
    <>
      <div className="container">
        <div className="row my-5">
          <div className="card mx-auto bg-light" style={formStyle}>
            <h3 className="my-2 py-2 fs-4">Leave a Comment</h3>
            <div className="col-md-12  float-start ">
              <input
                type="text"
                autoFocus={showCommentForm}
                className="form-control form-control-lg"
                placeholder="Name ..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-md-12 my-2 py-2">
              <textarea
                className="form-control form-control-lg"
                placeholder="Your Comments Here ..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>{" "}
            <div className="col-md-12  my-1 py-1">
              <button
                onClick={handleSubmit}
                className="form-control form-control-lg btn btn-secondary btn-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default Comments;
