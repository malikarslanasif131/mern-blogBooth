import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PopularPost from "../../components/PopularPost";
import Layout from "../../components/layout/Layout";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "newPassword":
        setNewPassword(value);
        break;
      case "answer":
        setAnswer(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/forget-password", {
        email,
        newPassword,
        answer,
      });
      if (res.data.success === true) {
        toast.success("Reset Password Successfully");
        if (res.data.message) navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-6 card offset-md-1 my-auto px-5 bg-light">
            <h1 className="text-center display-4 mt-5">Reset Password </h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="fs-3 p-1">Email</label>
                <input
                  value={email}
                  onChange={handleChange}
                  type="email"
                  className="form-control form-control-lg"
                  name="email"
                  required
                />
              </div>{" "}
              <div className="form-group">
                <label className="fs-4 p-1 mt-2">
                  What is your favourite Book
                </label>
                <input
                  value={answer}
                  onChange={handleChange}
                  type="text"
                  className="form-control form-control-lg"
                  name="answer"
                  required
                />
              </div>
              <div className="form-group">
                <label className="fs-3 p-1 ">New Password</label>
                <input
                  value={newPassword}
                  onChange={handleChange}
                  type="password"
                  className="form-control form-control-lg"
                  name="newPassword"
                  required
                />
              </div>
              <div className="form-group mt-3">
                <button
                  type="submit"
                  className="form-control form-control-lg btn btn-secondary btn-lg btn-block p-2 my-5"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-4 my-5 mx-auto">
            <h4 className="display-5 mx-2 p-2">Popular Posts</h4>

            <PopularPost />
          </div>
          <hr className="w-50 mx-auto my-5 text-dark" />
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
