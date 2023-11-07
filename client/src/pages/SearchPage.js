import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import CategoryList from "../components/CategoryList";
import Layout from "../components/layout/Layout";
import axios from "axios";

const ByCategoryPage = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [dataLength, setDataLength] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [categoryId, setCategoryId] = useState(0);

  const [categories, setCategories] = useState([]);

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
    async function fetchData() {
      await axios
        .get(
          `http://localhost:8080/api/blog/search-by-category?page=${page}&category_id=${categoryId}`
        )
        .then((res) => {
          setPosts(res.data.blogs);
          setDataLength(res.data.BlogCount);
          setTotalPages(Math.ceil(res.data.BlogCount / 7));
        });
    }

    fetchData();
  }, [page, categoryId]);

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
    <Layout>
      <div className="row">
        {/* Left Panel of Page */}
        <div className="col-md-8 m-3 p-3">
          <h4 className="display-5 mx-2 p-2">
            {posts[0]?.category.name} Posts{" "}
            <small className="fs-4">({dataLength ? dataLength : "0"})</small>
            <small className="fs-6 float-end m-4 p-1">Page No. {page}</small>
          </h4>
          <hr />
          <Card posts={posts} />
          <div className="d-flex justify-content-center mt-4">
            {paginationButtons}
          </div>
        </div>

        {/* Right Panel of Page */}
        <div className="col-md-3 m-3 p-3">
          {/* =====================Small Card=========== */}
          <CategoryList
            categories={categories}
            page={page}
            setCategoryId={setCategoryId}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ByCategoryPage;
