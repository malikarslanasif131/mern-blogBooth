import React from "react";
// , { useEffect, useState }
import "./App.css";
import { Routes, Navigate, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import BlogPage from "./pages/BlogPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Register from "./pages/Auth/Register";
import ScrollToTop from "./components/ScrollToTop";
import DashboardPage from "./pages/Author/DashboardPage";
import CreateNewPost from "./pages/Author/CreateNewPost";
import ShowAllPosts from "./pages/Author/ShowAllPosts";
import ShowAllComments from "./pages/Author/ShowAllComments";
import UserProfile from "./pages/Author/UserProfile";
import TestActive from "./TestActive";
import CategoryPage from "./pages/Author/CategoryPage";
import EditPostPage from "./pages/Author/EditPostPage";
import ByCategoryPage from "./pages/ByCategoryPage";
import UserContactUs from "./pages/Author/UserContactUs";
import Pagenotfound from "./pages/Pagenotfound";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./store/features/LoginFeature/loginSlice";

function App() {
  const loginFeature = useSelector((state) => state.loginFeature.value);
  // console.log(loginFeature, "loginFeature");
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login());
    // console.log(loginFeature, "loginFeatureDis");
  };

  // const handleLogout = () => {
  //   dispatch(logout());
  // };

  return (
    <>
      <ScrollToTop />
      {loginFeature && loginFeature ? (
        <Routes>
          {/* // Private Route */}
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<TestActive />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create-new-post" element={<CreateNewPost />} />
          <Route path="/show-all-posts" element={<ShowAllPosts />} />
          <Route path="/show-all-comments" element={<ShowAllComments />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/show-category" element={<CategoryPage />} />
          <Route path="/editBlog/:id" element={<EditPostPage />} />
          <Route path="/user-contact-us" element={<UserContactUs />} />

          {/* common */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogPage" element={<BlogPage />} />
          <Route path="/blogPage/:id" element={<BlogPage />} />
          <Route path="/search-page" element={<SearchPage />} />
          <Route path="/all-blog-page" element={<ByCategoryPage />} />

          <Route
            path="/login"
            element={
              loginFeature ? (
                <Navigate to="/" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          {/* <Route
            path="/logout"
            element={
              loginFeature ? (
                <Navigate to="/" replace />
              ) : (
                <LogOut onLogout={handleLogout} />
              )
            }
          /> */}
          <Route
            path="/forget-password"
            element={
              loginFeature ? <Navigate to="/" replace /> : <ForgotPassword />
            }
          />
          <Route
            path="register"
            element={loginFeature ? <Navigate to="/" replace /> : <Register />}
          />

          <Route path="*" element={<Pagenotfound />} />
        </Routes>
      ) : (
        <Routes>
          {/* // Public Route */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          {/* <Route path="/logout" element={<LogOut onLogout={handleLogout} />} /> */}
          <Route path="/forget-password" element={<ForgotPassword />} />
          <Route path="register" element={<Register />} />

          <Route path="/blogPage/:id" element={<BlogPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search-page" element={<SearchPage />} />
          <Route path="/all-blog-page" element={<ByCategoryPage />} />

          <Route path="/test" element={<TestActive />} />
          <Route path="*" element={<Pagenotfound />} />
        </Routes>
      )}
    </>
  );
}

export default App;
