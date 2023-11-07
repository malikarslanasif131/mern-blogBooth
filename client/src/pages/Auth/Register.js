import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout.js";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "address":
        setAddress(value);
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
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res.data.success === true) {
        toast.success("Register Successfully");
        navigate("/login");
      } else {
        toast.error(res.data.message);
        setError(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setError("");
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [error]);
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-6 card  my-5 px-5 bg-light">
            <h1 className="text-center display-5 mt-2">Registeration </h1>
            <form className="" onSubmit={handleSubmit}>
              {error && (
                <div className="form-group mx-auto form-control  my-3 text-danger">
                  {error}
                </div>
              )}
              <div className="form-group">
                <label className="fs-4 p-1">Name</label>
                <input
                  value={name}
                  onChange={handleChange}
                  type="text"
                  className="form-control form-control-lg"
                  name="name"
                  required
                />
              </div>
              <div className="form-group">
                <label className="fs-4 p-1">Email</label>
                <input
                  value={email}
                  onChange={handleChange}
                  type="email"
                  className="form-control form-control-lg"
                  name="email"
                  required
                />
              </div>
              <div className="form-group">
                <label className="fs-4 p-1">Password</label>
                <input
                  value={password}
                  onChange={handleChange}
                  type="password"
                  className="form-control form-control-lg"
                  name="password"
                  required
                />
              </div>
              <div className="form-group">
                <label className="fs-4 p-1">Phone</label>
                <input
                  value={phone}
                  onChange={handleChange}
                  type="number"
                  className="form-control form-control-lg"
                  name="phone"
                  required
                />
              </div>
              <div className="form-group">
                <label className="fs-4 p-1">Address</label>
                <input
                  value={address}
                  onChange={handleChange}
                  type="text"
                  className="form-control form-control-lg"
                  name="address"
                  required
                />
              </div>{" "}
              <div className="form-group">
                <label className="fs-4 p-1">What is your favourite Book</label>
                <input
                  value={answer}
                  onChange={handleChange}
                  type="text"
                  className="form-control form-control-lg"
                  name="answer"
                  required
                />
              </div>
              <div className="form-group mt-2">
                <button
                  type="submit"
                  className="form-control form-control-lg btn btn-secondary btn-lg btn-block p-2 my-3"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-4 my-5 offset-md-1 mx-auto bg-light">
            <p className="display-2 p-3 mx-3 fw-bold">WELLCOME</p>
            <p className="display-5 p-2">
              " Start your journey towards becoming a successful blogger today!
              Register and share your unique perspective with the world." <br />
              <small className="fs-4 float-end mt-3">Albert Einstein</small>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
