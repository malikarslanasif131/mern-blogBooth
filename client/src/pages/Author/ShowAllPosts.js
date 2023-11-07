import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardPage from "./DashboardPage";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ShowAllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [blogCount, setBlogCount] = useState("");
  const [page, setPage] = useState(1);
  const [dataLength, setDataLength] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  // eslint-disable-next-line
  const [categoryId, setCategoryId] = useState(0);
  if (message) {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }

  // async function fetchData() {
  //   await axios.get("http://localhost:8080/api/blog/show-posts").then((res) => {
  //     setPosts(res.data.blogs);
  //     setBlogCount(res.data.BlogCount);
  //   });
  // }
  async function fetchData() {
    await axios
      .get(`http://localhost:8080/api/blog/show-posts?page=${page}`)
      .then((res) => {
        setPosts(res.data.blogs);
        setDataLength(res.data.BlogCount);
        setTotalPages(Math.ceil(res.data.BlogCount / 6));
      });
  }
  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`http://localhost:8080/api/blog/delete-blog/${id}`)
        .then((res) => {
          setMessage(res.data.message);
        });
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    fetchData();
  }, [page]);

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
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h3 className="display-5 py-3 border-bottom">
              All Blogs{" "}
              <small className="fs-4 ">({dataLength ? dataLength : "0"})</small>
              <small className="fs-6 float-end m-4 p-1">Page No. {page}</small>
            </h3>
          </div>
          {message && (
            <div className="col-md-12">
              <div className="alert alert-success" role="alert">
                {message}
              </div>
            </div>
          )}

          {/* =========Start There===================================== */}
          {posts.length > 0 ? (
            posts.map((post, index) => {
              function extractPlainTextFromHtml(html) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
                return doc.body.textContent || "";
              }

              // Example usage:
              const postContent = post.content;
              const plainContent = extractPlainTextFromHtml(postContent);
              const shortContent = plainContent.substring(0, 90);

              const postTitle = post.title;
              const plainTitle = extractPlainTextFromHtml(postTitle);
              const shortTitle = plainTitle.substring(0, 25);
              return (
                <div
                  className="col-md-4 my-4"
                  key={index}
                  // style={{ minHeight: "300px", maxHeight: "300px" }}
                >
                  <div
                    className="card d-flex flex-fill  h-100"
                    // style={{ minHeight: "350px", maxHeight: "350px" }}
                  >
                    {/* <img
                      src={`http://localhost:8080/${post.path}`}
                      className="img-fluid rounded-start"
                      style={{ height: "28vh" }}
                      alt="..."
                    /> */}
                    <LazyLoadImage
                      alt="..."
                      className="img-fluid rounded-start"
                      style={{ height: "28vh", width: "100%" }}
                      // width="101%"
                      // height="28vh"
                      // scrollPosition={scrollPosition}
                      src={`http://localhost:8080/${post.path}`}
                      effect="blur"
                    />

                    <div className="card-body mt-0 mb-0 p-0">
                      {post.category && (
                        <p
                          className="mx-1 m-0 p-0 px-2 pt-1 "
                          style={{ fontSize: "4px" }}
                        >
                          Category :{" "}
                          <span className="text-primary m-0 p-0 ">
                            {post.category.name}
                          </span>
                        </p>
                      )}
                      <h4 className="card-title mb-0 px-3 ">{shortTitle}</h4>

                      <div className="card-text mb-2 text-indent-css px-2 ">
                        {shortContent}
                        {/* {post.content.substring(0, 60)}... */}
                        {/* {post.content.length > 60 && "..."} */}
                      </div>

                      <div
                        className="card-footer d-flex justify-content-between align-items-center mt-3"
                        style={{
                          bottom: "0px",
                          marginBottom: "0px",
                        }}
                      >
                        <Link
                          to={`/blogPage/${post._id}`}
                          className="btn btn-secondary"
                        >
                          Show More
                        </Link>
                        <div className="w-25 d-flex justify-content-between  ">
                          <Link to={`/editBlog/${post._id}`} className="">
                            <i className="fa-solid fa-pen-to-square fa-2x text-muted onHover-icons"></i>
                          </Link>
                          <button
                            onClick={() => {
                              handleDelete(post._id);
                            }}
                            // to={`/delete-blog/${post._id}`}
                            className="border border-white"
                          >
                            <i className="fa-solid fa-trash fa-2x text-muted onHover-icons"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="" style={{ height: "75vh", with: "100%" }}>
              <div className="d-flex justify-content-center ">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          )}

          <div className="d-flex justify-content-center mt-4">
            {paginationButtons}
          </div>

          {/* ======================Extra======================================= */}
        </div>
      </div>
    </DashboardPage>
  );
};

export default ShowAllPosts;
