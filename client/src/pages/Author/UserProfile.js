import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import DashboardPage from "./DashboardPage";
import "./author.css";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [toggleType, setToggleType] = useState("password");
  const [error, setError] = useState("");
  // const navigate = useNavigate();
  const token = localStorage.getItem("token").slice(1, -1);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

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
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8080/api/auth/update-profile",
        {
          name,
          email,
          password,
          phone,
          address,
          answer,
        },
        config
      );
      if (res.data.success === true) {
        toast.success("Updated Successfully");
        setLoading(false);
        // navigate("/user-profile");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:8080/api/auth/profile", config).then((res) => {
      if (res.data.success === true) {
        setName(res.data.user.name);
        setEmail(res.data.user.email);
        setPhone(res.data.user.phone);
        setAddress(res.data.user.address);
        setAnswer(res.data.user.answer);
      } else {
        setError(error.response.data.message);
        toast.error(res.data.message);
      }
    });
  }, []);
  return (
    <DashboardPage>
      <div className="container">
        <div className="row">
          <div className="display-5 border-bottom py-3">Update Profile </div>

          <div className="col-md-12 my-1 ">
            <form className="">
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
                <div className="d-flex ">
                  {/* <input
                    className="me-3  form-control form-control-lg form-check-input  mt-0 checkedBoxStyle "
                    type="checkbox"
                    value={<i className="fa-regular fa-eye"></i>}
                    onClick={() => {
                      setToggleType(
                        toggleType === "password" ? "text" : "password"
                      );
                    }}
                  /> */}

                  <input
                    value={password}
                    onChange={handleChange}
                    type={toggleType}
                    className="form-control form-control-lg"
                    name="password"
                    placeholder="Password Remember"
                    // disabled
                  />
                  <button
                    style={{ width: "10%" }}
                    className="btn btn-secondary form-control "
                    onClick={(e) => {
                      e.preventDefault();
                      setToggleType(
                        toggleType === "password" ? "text" : "password"
                      );
                    }}
                  >
                    {toggleType === "password" ? (
                      <i className="fa-solid fa-eye-slash"></i>
                    ) : (
                      <i className="fa-solid fa-eye"></i>
                    )}
                  </button>
                </div>
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
              <p>{error}</p>
              <div className="form-group mt-3">
                <button
                  type="submit"
                  className="form-control form-control-lg btn btn-secondary btn-lg btn-block p-2 my-3"
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <>
                      <div>
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardPage>
  );
};

export default UserProfile;
