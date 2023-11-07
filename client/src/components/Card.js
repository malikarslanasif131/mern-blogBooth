import React from "react";
import { Link } from "react-router-dom";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-lazy-load-image-component/src/effects/blur.css";

const Card = ({ posts }) => {
  return (
    <>
      {posts && posts.length > 0 ? (
        posts.map((post) => {
          const date = new Date(post?.createdAt);
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
          const postContent = post.content;
          const plainContent = extractPlainTextFromHtml(postContent);
          const shortContent = plainContent.substring(0, 300);

          const postTitle = post.title;
          const plainTitle = extractPlainTextFromHtml(postTitle);
          const shortTitle = plainTitle.substring(0, 50);

          return (
            <Link
              to={`/blogPage/${post._id}`}
              className="nav-link text-dark m-3 p-2 d-inline"
              style={{ textDecoration: "none" }}
              key={post._id}
            >
              <div className="card p-3 bg-light">
                <div className="row">
                  <div className="col-md-4">
                    <img
                      src={`/${post.path}`}
                      className="img-fluid rounded-start"
                      style={{ width: "105%", height: "180px" }}
                      alt="..."
                    />
                    {/* <LazyLoadImage
                      src={`http://localhost:8080/${post.path}`}
                      alt="..."
                      width="101%"
                      height={180}
                      scrollPosition={scrollPosition}
                      effect="blur"
                    /> */}
                  </div>
                  <div className="col-md-8">
                    <div className="card-body pb-0">
                      <h5 className="card-title fs-3 text-align-justify-css">
                        {shortTitle}...
                      </h5>
                      <div className="card-text text-align-justify-css">
                        {shortContent}...
                      </div>

                      <p className="pt-3 mb-0">
                        <small className="text-muted pt-3">
                          {formattedDate}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <div className="d-flex justify-content-center">
          <h2 className="mt-5">Loading ...</h2>
        </div>
      )}
    </>
  );
};

export default Card;
