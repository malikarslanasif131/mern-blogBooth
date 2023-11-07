import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import NavScroller from "./NavScroller";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <NavScroller />
      <main style={{ minHeight: "80vh" }}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
