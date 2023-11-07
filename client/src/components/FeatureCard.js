import React from "react";
import { Link } from "react-router-dom";
// import DisplayData from "../pages/Author/dangerouslySetInnerHTML";
import "./components.css";

const FeatureCard = ({ featurePost }) => {
  const date = new Date(featurePost?.createdAt);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  function extractPlainTextFromHtml(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  // Example usage:
  const postContent = featurePost.content;
  const plainContent = extractPlainTextFromHtml(postContent);
  const shortContent = plainContent.substring(0, 300);

  const postTitle = featurePost.title;
  const plainTitle = extractPlainTextFromHtml(postTitle);
  const shortTitle = plainTitle.substring(0, 100);

  return (
    <>
      <div className="container-fluid">
        <div
          className="row p-md-5 rounded"
          style={{ backgroundColor: "#f4f0ec " }}
        >
          <div className="col-md-6 ">
            <h1 className="display-5 font-italic py-3 text-align-justify-css">
              {shortTitle}...
            </h1>
            <p className="lead my-3 fs-4 text-indent-css text-align-justify-css ">
              {shortContent}...
            </p>
            <p className="lead my-5 d-flex justify-content-center">
              <Link
                to={`/blogPage/${featurePost._id}`}
                className="btn btn-secondary btn-lg font-weight-bold p-3 px-5"
              >
                Continue reading...
              </Link>
            </p>
          </div>
          <div className="d-block col-md-6" style={{ textAlign: "center" }}>
            <div className="mx-auto px-5 ">
              <div>
                <img
                  src={`http://localhost:8080/${featurePost.path}`}
                  className="img-fluid rounded "
                  alt="..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureCard;
