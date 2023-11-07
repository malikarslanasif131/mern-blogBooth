import React from "react";
import { Link } from "react-router-dom";
import Layout from "./../components/layout/Layout";

const Pagenotfound = () => {
  return (
    <Layout title={"go back- page not found"}>
      <div className="w-25 mx-auto mt-5 pt-5">
        <h1 className="display-1" style={{ fontSize: "120px" }}>
          404
        </h1>
        <h2 className="fs-2 mt-3">Oops! Page Not Found</h2>
        <div className="w-75">
          <Link
            to="/"
            className="form-control btn btn-secondary btn-lg m-3 mt-5 ms-0"
          >
            Go Back
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
