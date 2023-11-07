import React from "react";
import { Link } from "react-router-dom";
import "./components.css";

const PopularPost = ({ popularPosts }) => {
  // const [posts, setPosts] = useState([]);

  // const fetchData = async () => {
  //   await axios.get("/api/blog/show-all-posts").then((res) => {
  //     setPosts(res.data.blogs);
  //   });
  // }

  // useEffect(() => {
  //   fetchData();
  // }, []);
  return (
    <>
      {popularPosts &&
        popularPosts.map((post, index) => {
          const date = new Date(post?.createdAt);
          const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
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
          const shortContent = plainContent.substring(0, 45);

          const postTitle = post.title;
          const plainTitle = extractPlainTextFromHtml(postTitle);
          const shortTitle = plainTitle.substring(0, 20);
          return (
            <div className="card p-1 mt-3" key={index}>
              <Link
                className="m-1 text-decoration-none text-dark"
                to={`/blogPage/${post._id}`}
              >
                <div className="row">
                  <div className="col-md-8">
                    <div className="card-body m-0 p-1">
                      <h5 className="card-title text-align-justify-css">
                        {shortTitle}
                      </h5>
                      <p className="card-text text-align-justify-css mb-0 font-DecSize-css">
                        {shortContent}
                      </p>

                      <small className="text-muted pt-1">{formattedDate}</small>
                    </div>
                  </div>
                  <div className="col-md-4 p-0">
                    <img
                      src={`http://localhost:8080/${post.path}`}
                      className="rounded m-0 p-0"
                      width={98}
                      height={95}
                      alt="..."
                    />
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
    </>
  );
};

export default PopularPost;
