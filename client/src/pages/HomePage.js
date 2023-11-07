import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import FeatureCard from "../components/FeatureCard";
import PopularPost from "../components/PopularPost";
import CategoryList from "../components/CategoryList";
import Layout from "../components/layout/Layout";
import axios from "axios";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [popularPosts, setPopularPost] = useState([]);
  const [featurePost, setFeaturePost] = useState("");
  const [page, setPage] = useState(1);
  // eslint-disable-next-line
  const [dataLength, setDataLength] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [categories, setCategories] = useState([]);
  // eslint-disable-next-line
  const [categoryId, setCategoryId] = useState(0);

  const [searchValue, setSearchValue] = useState("");
  const [searchX, setSearchX] = useState(false);
  // const [copyPosts, setCopyPosts] = useState([]);

  // --------------------------------------For Lazy Image Load -------------------------
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    // Update scroll position
    setScrollPosition(window.pageYOffset);
  };

  // Add scroll event listener to update scroll position
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // --------------------------------------End For Lazy Image Load -------------------------

  useEffect(() => {
    async function fetchCategory() {
      await axios
        .get("http://localhost:8080/api/category/get-all")
        .then((res) => {
          setCategories(res.data.category);
        });
    }
    fetchCategory();
  }, []);

  useEffect(() => {
    async function fetchFeaturePost() {
      const { data } = await axios.get(
        "http://localhost:8080/api/blog/show-feature-post"
      );
      setFeaturePost(data.blogs[0]);
    }
    fetchFeaturePost();
  }, []);
  // =====================================Merg the search and Get All -------------------------
  async function fetchData() {
    try {
      setPosts([]);
      const url = searchX
        ? `http://localhost:8080/api/blog/get-and-search?term=${searchValue}&page=${page}`
        : `http://localhost:8080/api/blog/get-and-search?page=${page}`;
      const res = await axios.get(url);
      setPosts(res.data.blogs);
      setPopularPost(res.data.popularPosts);
      setDataLength(res.data.BlogCount);
      setTotalPages(Math.ceil(res.data.BlogCount / 9));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [searchX]);

  const handleSearch = async () => {
    if (searchValue === "") {
      setSearchX(false);
    } else {
      try {
        setSearchX(true);
        // setPage(page);
        await fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  // ==============================================search and Get All -------------------------
  // async function fetchData() {
  //   await axios
  //     .get(`http://localhost:8080/api/blog/show-posts?page=${page}`)
  //     .then((res) => {
  //       setPosts(res.data.blogs);
  //       setPopularPost(res.data.popularPosts);
  //       setDataLength(res.data.BlogCount);
  //       setTotalPages(Math.ceil(res.data.BlogCount / 6));
  //     });
  // }
  // useEffect(() => {
  //   fetchData();
  // }, [page]);

  // useEffect(() => {
  //   fetchData();
  // }, [searchX]);

  // // ----------------------search-----------
  // const handleSearch = async () => {
  //   if (searchValue === "") {
  //     setSearchX(false);
  //   } else {
  //     try {
  //       setSearchX(true);
  //       await axios
  //         .get(`http://localhost:8080/api/blog/search?term=${searchValue}`)
  //         .then((res) => {
  //           setPosts(res.data.blogs);
  //           console.log(res.data.blogs);
  //           setDataLength(res.data.BlogCount);
  //           setTotalPages(Math.ceil(res.data.BlogCount / 6));
  //         });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };
  // ==================================================End of search and Get All -------------------------
  const handleClearSearch = () => {
    setSearchValue("");
    setSearchX(false);
    setPage(1);
  };

  function handlePaginationClick(newPage) {
    window.scrollTo(0, 550);
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
    <Layout>
      <FeatureCard featurePost={featurePost} />
      <div className="row">
        {/* Left Panel of Page */}

        <div className="col-md-8 m-3 p-3">
          <h4 className="fs-3 p-2 ms-5">
            Recent Posts
            <small className="fs-6 float-end m-1 p-1">Page No. {page}</small>
          </h4>
          <div className="ms-5">
            <Card posts={posts} scrollPosition={scrollPosition} />
          </div>
        </div>

        {/* Right Panel of Page */}
        <div className="col-md-3 m-3 p-3">
          {/* ///////////////////////////////////////////////Serch Bar//////////////////////////////////////// */}
          <h4 className="fs-3 p-2">Search Posts</h4>

          <div
            className="input-group input-group-lg mx-auto mt-2 bg-light"
            // style={{ width: "33%" }}
          >
            <input
              type="text"
              value={searchValue}
              placeholder="Search Post ..."
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              style={{ outline: "none" }}
              className="form-control bg-light text-dark"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-lg"
            />
            <div
              className="input-group-append"
              style={{
                position: "absolute",
                right: "52px",
                marginRight: "-10px",
                zIndex: " 10",
                background: "transparent",
                border: " none",
              }}
            >
              <button
                className="btn btn-lg bg-light form-control  "
                type="button"
                onClick={() => {
                  handleClearSearch();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  viewBox="0 0 384 512"
                >
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </button>
            </div>
            <div
              className="input-group-append"
              // style={{ marginRight: "-40px", marginTop: "-1px" }}
            >
              <button
                className="btn btn-lg bg-light form-control  "
                type="button"
                onClick={() => {
                  handleSearch();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </button>
            </div>
          </div>

          <h4 className="fs-3 p-2 mt-3">Popular Posts</h4>
          {/* =====================Small Card=========== */}
          <PopularPost popularPosts={popularPosts} />
          <CategoryList
            categories={categories}
            page={page}
            setCategoryId={setCategoryId}
          />
        </div>
        <div className="row mt-0">
          <div className="col-md-8">
            {/* <div className="mx-auto w-25">
              <Link
                to="/category-page"
                className="btn btn-secondary btn-lg m-3 p-2"
              >
                View Category Page
              </Link>
            </div> */}

            <div className="d-flex justify-content-center my-4 mb-5">
              {paginationButtons}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
