import React from "react";
import AdminNav from "./AdminNav";
import { useSelector } from "react-redux";
// import { open, close } from "../../store/features/sidebarSlice";

import SideBar from "./SideBar";

const DashboardPage = ({ children }) => {
  const toggle = useSelector((state) => state.sideBarReducer.value);

  return (
    <>
      <div className="fixed-top">
        <AdminNav />
      </div>

      <div className="container-fluid sticky">
        <div className="row">
          <div className=" p-0 m-0 col-md-3">
            <SideBar />
          </div>
          <div
            className={
              toggle === "d-none" ? "col-md-10 offset-md-1" : "col-md-9"
            }
          >
            <div style={{ marginTop: "8%" }}> </div>
            {children}
          </div>
        </div>
        <hr className="w-100 " />
      </div>
    </>
  );
};

export default DashboardPage;
