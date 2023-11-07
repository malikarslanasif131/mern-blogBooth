import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/features/LoginFeature/loginSlice.js";

const Header = () => {
  // const [user, setUser] = useState("");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const token = JSON.parse(localStorage.getItem("token"));
  var user = null;
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    try {
      user = JSON.parse(storedUser);
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }
  }

  const dispatch = useDispatch();
  const loginFeature = useSelector((state) => state.loginFeature.value);

  if (loginFeature) {
    localStorage.setItem("loginFeature", loginFeature);
  }

  const handelLogout = () => {
    localStorage.removeItem("loginFeature");
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    dispatch(logout());
    window.location.reload();
  };

  // useEffect(() => {}, [loginFeature]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-0">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <Link
              className="navbar-brand ms-5"
              to="/"
              style={{ height: "60px" }}
            >
              <span className="ms-3 fs-2 fw-bold align-baseline">
                <img
                  src="/images/logo-light.png "
                  className="img-fluid rounded m-2"
                  width={50}
                  alt="logo"
                />
                BlogBooth
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
            className="collapse navbar-collapse me-5 fs-4"
            id="navbarTogglerDemo02"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item  p-2">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item p-2">
                <NavLink className="nav-link" to="/all-blog-page">
                  Blog
                </NavLink>
              </li>
              {localStorage.getItem("loginFeature") ? (
                <>
                  <li className="nav-item p-2">
                    <NavLink
                      className="nav-link"
                      to="/show-all-posts"
                      style={{
                        backgroundColor: " #353839 ",
                        borderRadius: "10px",
                      }}
                    >
                      <span className="ms-2 me-2">
                        <img
                          style={{ borderRadius: "50%" }}
                          src="/images/user-avatar.jpg "
                          className="img-fluid mt-0 "
                          width={30}
                          alt="avatar"
                        />
                      </span>
                      <span className="me-1 pt-5 fs-5">
                        {user && user.name}
                      </span>
                    </NavLink>
                  </li>
                  <li className="nav-item py-2 m-1">
                    <NavLink
                      className="nav-link fs-4"
                      onClick={handelLogout}
                      to="#"
                    >
                      Logout
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item p-2">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item p-2">
                    <NavLink className="nav-link" to="/register">
                      Register
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
