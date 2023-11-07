import React, { useState } from "react";
import ContactCarousel from "../components/ContactCarousel";
import Layout from "../components/layout/Layout";
import axios from "axios";
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  // const [error, setError] = useState(false);

  if (successMessage) {
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post("http://localhost:8080/api/contact/create-message", {
        name,
        email,
        message,
        subject,
      })
      .then((res) => {
        setSuccessMessage(res.data.message);
        setLoading(false);
        // setError(false);
        setName("");
        setEmail("");
        setMessage("");
        setSubject("");
      });
    // console.log(name, email, message, subject);
  };

  return (
    <Layout>
      <ContactCarousel />

      {/* ===================Form==================== */}
      <div className="container">
        <div className="row bg-light">
          <div className="col-md-12">
            <h1 className="col-md-8  p-2 m-2 display-5">
              Contact Information :
            </h1>
            {/* ============================================ */}
            <div className="col-md-8 mx-auto p-2 m-2">
              <p>
                &emsp; &emsp;&emsp; &emsp; &emsp; &emsp; &emsp;PakWired brings
                you the latest news, thoughtful articles, reviews and analysis
                of the latest in Pakistan’s Tech Industry. We help you stay on
                top of the issues that affect your business the most. It doesn’t
                matter if you’re a solo entrepreneur like a software or app
                developer, a small business owner, or an executive with a larger
                company. PakWired.com has what you need to know.
              </p>
              <p>
                PakWired is happy to hear from you! You can contact any of our
                editors or correspondents mentioned below.
              </p>
              <h3>
                <strong>Website Suggestions &amp; Error Reports</strong>
              </h3>
              <p>
                If you are experiencing problems with the site, or if you have
                any suggestions as to how we can improve it, please email us at
                webmaster@pakwired.com
              </p>

              <h3>
                <strong>
                  Head Office
                  <br />
                </strong>
              </h3>
              <p>Acorn House, Robinhood Road, Dublin – Ireland</p>
              <p>Phone: +92 - 123456789</p>
              <h3>
                <strong>Pakistan Office</strong>
              </h3>
              <p>Dhudian Road , Rawalpindi</p>
            </div>
            <hr className="w-50 mx-auto my-3 text-dark" />

            {/* ============================================ */}
            <div className="container">
              <div className="row">
                <h1 className="col-md-8 display-5">Contact us :</h1>
                <form className="col-md-8 mx-auto  " onSubmit={handleSubmit}>
                  <div className="">
                    <small
                      className={`alert alert-success fs-4 text-success w-75  ${
                        successMessage ? "d-block" : "d-none"
                      }   `}
                    >
                      {successMessage ? successMessage : ""}
                    </small>
                    <div className="col-md-8 mt-2">
                      {/* <label htmlFor="name" className=" fw-bold m-1">
                        Name :
                      </label> */}
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        name="name"
                        required={true}
                        placeholder="Name ..."
                        disabled={successMessage}
                        className="form-control form-control-lg my-2"
                        id="name"
                      />
                    </div>
                    <div className="col-md-8">
                      {/* <label htmlFor="email" className=" fw-bold m-1">
                        Email :
                      </label> */}
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        type="email"
                        required={true}
                        placeholder="Email ..."
                        disabled={successMessage}
                        className="form-control form-control-lg my-2"
                        id="email"
                      />
                    </div>
                    <div className="col-md-8">
                      {/* <label htmlFor="subject" className=" fw-bold m-1">
                        Subject :
                      </label> */}
                      <input
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        name="subject"
                        type="text"
                        disabled={successMessage}
                        placeholder="Subject ..."
                        className="form-control form-control-lg my-2"
                        id="subject"
                      />
                    </div>
                    <div className="col-md-8">
                      {/* <label htmlFor="message" className=" fw-bold m-1">
                        Message :
                      </label> */}
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        name="message"
                        required={true}
                        className="form-control form-control-lg my-2 "
                        id="message"
                        placeholder="Type your message here ..."
                        disabled={successMessage}
                        rows="5"
                      ></textarea>
                    </div>

                    <div className="col-md-8 mt-0">
                      <button
                        className="form-control btn btn-secondary p-1 fs-3 btn-lg my-3"
                        type="submit"
                        // onClick={() => handleDelete(category._id)}
                      >
                        {loading ? (
                          <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <hr className="w-50 mx-auto my-3 text-dark" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
