import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const CategoryList = ({ categories, page, setCategoryId }) => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category_id = params.get("category_id");
    setCategoryId(category_id);
  }, [location.search, setCategoryId]);

  return (
    <>
      <div className="card card-body p-3 mt-5">
        <h4 className="fs-3 font-italic card-title">Post Category</h4>

        <ul className="list-unstyled m-2 card-text">
          {categories &&
            categories.map((category) => (
              <li key={category._id}>
                <Link
                  className="nav-link text-dark m-2"
                  to={`/search-page?page=${page}&category_id=${category._id}`}
                  style={{ textDecoration: "none" }}
                >
                  {category.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default CategoryList;
