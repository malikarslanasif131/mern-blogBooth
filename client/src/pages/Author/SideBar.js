import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./author.css";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../../store/features/sidebarSlice";

function SideBar() {
  const [activeLink, setActiveLink] = useState(null);
  const toggle = useSelector((state) => state.sideBarReducer.value);
  const dispatch = useDispatch();

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  const sidebarStyle = {
    backgroundColor: "#f4f0ec",
    maxWidth: "300px",
    minWidth: "300px",
    height: "calc(100vh - 11%)",
    zIndex: "100",
    position: "fixed",
    top: "10%",
    left: "0",
    overflowY: "auto",
  };

  return (
    <>
      <div
        className={`text-dark smSidebar50vh m-0 ${toggle}`}
        style={sidebarStyle}
      >
        <div className="d-flex justify-content-end p-1">
          <i
            onClick={() => {
              dispatch(close());
            }}
            className="fa-solid fa-xmark onHover fa-2x btn"
          ></i>
        </div>
        <div>
          <div className="pt-1 ">
            <NavLink
              to="/create-new-post "
              className="btn btn-secondary text-light fs-4 mx-5 btnDark  rounded-2 "
            >
              <span className="pt-5">
                <i className="fa-sharp fa-solid fa-plus me-3"></i>New Post
              </span>
            </NavLink>
          </div>
        </div>

        <hr className="w-75 mx-auto" />
        <ul className="mx-0 px-0" style={{ listStyleType: "none" }}>
          <li
            className={
              activeLink === 0
                ? "py-3 sidebar-li active-li "
                : "py-3 sidebar-li "
            }
            onClick={() => handleLinkClick(0)}
          >
            <NavLink
              className="text-decoration-none  text-dark fs-4 ms-5 "
              to="/show-all-posts"
              onClick={() => handleLinkClick(0)}
            >
              <i className="fa-solid fa-blog me-3"></i> Posts
            </NavLink>
          </li>
          <li
            className={
              activeLink === 1
                ? "py-3 sidebar-li active-li "
                : "py-3 sidebar-li "
            }
            onClick={() => handleLinkClick(1)}
          >
            <NavLink
              className="text-decoration-none  text-dark fs-4 ms-5 "
              onClick={() => handleLinkClick(1)}
              to="/show-category"
            >
              <i className="fa-solid fa-folder me-3"></i>Category
            </NavLink>
          </li>
          <li
            className={
              activeLink === 2
                ? "py-3 sidebar-li active-li "
                : "py-3 sidebar-li "
            }
            onClick={() => handleLinkClick(2)}
          >
            <NavLink
              className="text-decoration-none  text-dark fs-4 ms-5 "
              onClick={() => handleLinkClick(2)}
              to="/show-all-comments"
            >
              <i className="fa-solid fa-comments me-3"></i>Comments
            </NavLink>
          </li>

          {/* ================================================================================= */}
          <li
            className={
              activeLink === 3
                ? "py-3 sidebar-li active-li "
                : "py-3 sidebar-li "
            }
            onClick={() => handleLinkClick(3)}
          >
            <NavLink
              className="text-decoration-none  text-dark fs-4 ms-5 "
              onClick={() => handleLinkClick(3)}
              to="/user-contact-us"
            >
              <i className="fa-solid fa-users me-3"></i>User Messages
            </NavLink>
          </li>
          <li
            className={
              activeLink === 4
                ? "py-3 sidebar-li active-li "
                : "py-3 sidebar-li "
            }
            onClick={() => handleLinkClick(4)}
          >
            <NavLink
              className="text-decoration-none  text-dark fs-4 ms-5 "
              to="/user-profile"
              onClick={() => handleLinkClick(4)}
            >
              <i className="fa-solid fa-gear me-3"></i> Settings
            </NavLink>
          </li>
        </ul>
        <hr className="w-75 mx-auto" />
        <ul className=" m-0 px-0" style={{ listStyleType: "none" }}>
          <li className=" py-3 sidebar-li  " style={{}}>
            <NavLink
              className="text-decoration-none  text-dark fs-4 ms-5 "
              to="/"
            >
              <i className="fa-solid fa-arrow-up-right-from-square me-3"></i>{" "}
              View Blogs
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SideBar;
