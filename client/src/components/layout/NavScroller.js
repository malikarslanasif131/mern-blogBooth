import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Layout.css";

const NavScroller = () => {
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
  const page = 1;
  return (
    <>
      <div className="nav-scroller p-1 " style={{ backgroundColor: "#d3d3d3" }}>
        <nav className="nav d-flex justify-content-evenly">
          {categories &&
            categories.map((category) => (
              <Link
                key={category._id}
                className="nav-link text-dark onHoverNavScroll"
                to={`/search-page?page=${page}&category_id=${category._id}`}
                style={{ textDecoration: "none" }}
              >
                {category.name}
              </Link>
            ))}

          {/* <Link
            className="nav-link text-dark "
            to="/"
            style={{ textDecoration: "none" }}
          >
            World
          </Link>
          <Link
            className=" text-dark "
            to="/appsPage"
            style={{ textDecoration: "none" }}
          >
            Apps
          </Link>
          <Link
            className=" text-dark "
            to="/"
            style={{ textDecoration: "none" }}
          >
            Technology
          </Link>
          <Link
            className=" text-dark "
            to="/howToPage"
            style={{ textDecoration: "none" }}
          >
            How-To
          </Link>
          <Link
            className=" text-dark "
            to="/tecPage"
            style={{ textDecoration: "none" }}
          >
            Tec
          </Link>
          <Link
            className=" text-dark "
            to="/"
            style={{ textDecoration: "none" }}
          >
            Business
          </Link>
          <Link
            className=" text-dark "
            to="/"
            style={{ textDecoration: "none" }}
          >
            Politics
          </Link>
          <Link
            className=" text-dark "
            to="/"
            style={{ textDecoration: "none" }}
          >
            Opinion
          </Link>
          <Link
            className=" text-dark "
            to="/"
            style={{ textDecoration: "none" }}
          >
            Science
          </Link>
          <Link
            className=" text-dark "
            to="/"
            style={{ textDecoration: "none" }}
          >
            Health
          </Link>
          <Link
            className=" text-dark "
            to="/newsPage"
            style={{ textDecoration: "none" }}
          >
            News
          </Link>
          <Link
            className=" text-dark "
            to="/"
            style={{ textDecoration: "none" }}
          >
            Travel
          </Link> */}
        </nav>
      </div>
    </>
  );
};

export default NavScroller;
