import React from "react";
import "./author.css";
import { open, close } from "../../store/features/sidebarSlice";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/features/LoginFeature/loginSlice.js";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginFeature = useSelector((state) => state.loginFeature.value);
  const toggle = useSelector((state) => state.sideBarReducer.value);

  if (loginFeature) {
    localStorage.setItem("loginFeature", loginFeature);
  }

  const handelLogout = async () => {
    localStorage.removeItem("loginFeature");
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    await dispatch(logout());
    navigate("/");

    // window.location.reload();
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark "
        style={{ backgroundColor: "#454545" }}
      >
        <div className="container-fluid">
          <div className="d-flex align-items-center mt-0 p-0">
            <Link
              className="navbar-brand ms-2 mt-0"
              to="#"
              style={{ height: "50px" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={50}
                height={50}
                fill="currentColor"
                onClick={() => {
                  dispatch(toggle === "d-none" ? open() : close());
                }}
                className="bi bi-list text-center text-light onHover-list "
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>

              {/* <span className=" fs-1 fw-bold align-baseline"></span> */}
            </Link>
          </div>{" "}
          <div className="d-flex align-items-center mt-0">
            <Link
              className="navbar-brand ms-2 me-5 "
              to="/"
              style={{ height: "50px" }}
            >
              <span className="ms-3 me-5 ">
                <img
                  src="/images/logo-light.png "
                  className="img-fluid rounded onHover-list mt-0 "
                  width={50}
                  alt="logo"
                />
              </span>
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse me-5 fs-3"
            id="navbarTogglerDemo02"
          >
            {/* /////////Serch Bar////////////// */}

            {/* <div
              className="input-group input-group-lg mx-auto mt-2 bg-light"
              style={{ width: "33%" }}
            >
              <input
                type="text"
                style={{ outline: "none" }}
                className="form-control bg-light text-dark"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
              />
              <div
                className="input-group-append"
                // style={{ marginRight: "-40px", marginTop: "-1px" }}
              >
                <button
                  className="btn btn-lg bg-light form-control  "
                  type="button"
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
            </div> */}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {localStorage.getItem("loginFeature") && (
                <>
                  <li className="nav-item mx-2 p-2">
                    <NavLink className="nav-link fs-4" to="/show-all-posts">
                      <i className="fa-solid fa-user me-2"></i>
                      {user && user.name}
                    </NavLink>
                  </li>
                  <li className="nav-item mx-2 p-2">
                    <NavLink
                      className="nav-link fs-4"
                      onClick={handelLogout}
                      to="#"
                    >
                      Logout <i className="fa-solid fa-right-from-bracket"></i>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
