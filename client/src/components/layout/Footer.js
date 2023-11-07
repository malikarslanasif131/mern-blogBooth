import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const Footer = () => {
  const [subcribedEmail, setSubcribedEmail] = useState("");
  // subcribedEmail && console.log(subcribedEmail);
  return (
    <>
      <div
        className="container-fluid bg-dark text-light pt-2"
        style={{ overflowX: "hidden" }}
      >
        <footer className="py-5 px-3">
          <div className="row">
            <div className="col-4 col-lg-3 ">
              <h4>About Us</h4>

              <ul className="navbar-nav flex-column ">
                <li className="nav-item mb-2">
                  <NavLink
                    to="/about"
                    className="nav-link p-0 text-muted d-inline-block fs-5"
                  >
                    About
                  </NavLink>
                </li>
                <li className="nav-item mb-2">
                  <NavLink
                    to="/contact"
                    className="nav-link p-0 text-muted d-inline-block fs-5"
                  >
                    Contact Us
                  </NavLink>
                </li>

                <li className="nav-item mb-2">
                  <NavLink
                    to="pravicy-policy"
                    className="nav-link p-0 text-muted d-inline-block fs-5"
                  >
                    Pravicy Policy
                  </NavLink>
                </li>

                <li className="nav-item mb-2">
                  <NavLink
                    to="/faqs"
                    className="nav-link p-0 text-muted d-inline-block fs-5"
                  >
                    FAQs
                  </NavLink>
                </li>
                <li className="nav-item mb-2">
                  <NavLink
                    to="/terms-and-conditions"
                    className="nav-link p-0 text-muted d-inline-block fs-5 "
                  >
                    Terms and Conditions
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="col-3 ">
              <h4>Others</h4>
              <ul className="nav flex-column text-white">
                <li className="nav-item mb-2">
                  <NavLink
                    to="/all-blog-page"
                    className="nav-link p-0 text-muted d-inline-block fs-5"
                  >
                    Categories
                  </NavLink>
                </li>{" "}
                <li className="nav-item mb-2">
                  <NavLink
                    to="/authors"
                    className="nav-link p-0 text-muted d-inline-block fs-5"
                  >
                    Authors
                  </NavLink>
                </li>
                <li className="nav-item mb-2">
                  <NavLink
                    to="/tags"
                    className="nav-link p-0 text-muted d-inline-block fs-5"
                  >
                    Tags
                  </NavLink>
                </li>
                <li className="nav-item mb-2">
                  <NavLink
                    to="/site-map"
                    className="nav-link p-0 text-muted d-inline-block fs-5"
                  >
                    Site Map
                  </NavLink>
                </li>
                <li className="nav-item mb-2">
                  <NavLink
                    to="/asdvertise-with-us"
                    className="nav-link p-0 text-muted d-inline-block fs-5"
                  >
                    Advertise With Us
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="col-4 ">
              <form>
                <h4 className="p-2">Subscribe to our newsletter</h4>
                <p className="p-2">
                  Monthly digest of whats new and exciting from us.
                </p>
                <div className="d-flex w-100 gap-1">
                  <label htmlFor="newsletter1" className="visually-hidden">
                    Email address
                  </label>
                  <input
                    id="newsletter1"
                    type="email"
                    value={subcribedEmail}
                    onChange={(e) => setSubcribedEmail(e.target.value)}
                    className="form-control"
                    placeholder="Email address"
                    required={true}
                  />
                  <button
                    onClick={() => {
                      // console.log(subcribedEmail);
                      setSubcribedEmail("");
                    }}
                    className="btn btn-secondary"
                    type="button"
                  >
                    Subscribe
                  </button>
                </div>
              </form>

              <div className="pt-3 mt-3">
                <ul className="list-unstyled d-flex">
                  <li className="mx-3">
                    <Link className="link" to="/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        style={{ fontSize: "32px", color: "gray" }}
                        fill="currentColor"
                        className="bi bi-twitter"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                      </svg>
                    </Link>
                  </li>
                  <li className="mx-5">
                    <Link className="link" to="/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        style={{ fontSize: "32px", color: "gray" }}
                        fill="currentColor"
                        className="bi bi-whatsapp "
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                      </svg>
                    </Link>
                  </li>
                  <li className="ms-3 me-5 ">
                    <Link className="" to="/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        style={{ fontSize: "32px", color: "gray" }}
                        fill="currentColor"
                        className="bi bi-stack-overflow"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.412 14.572V10.29h1.428V16H1v-5.71h1.428v4.282h9.984z" />
                        <path d="M3.857 13.145h7.137v-1.428H3.857v1.428zM10.254 0 9.108.852l4.26 5.727 1.146-.852L10.254 0zm-3.54 3.377 5.484 4.567.913-1.097L7.627 2.28l-.914 1.097zM4.922 6.55l6.47 3.013.603-1.294-6.47-3.013-.603 1.294zm-.925 3.344 6.985 1.469.294-1.398-6.985-1.468-.294 1.397z" />
                      </svg>
                    </Link>
                  </li>
                  <li className="mx-3">
                    <Link className="link" to="/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        style={{ fontSize: "32px", color: "gray" }}
                        fill="currentColor"
                        className="bi bi-instagram"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                      </svg>
                    </Link>
                  </li>
                  <li className="mx-5">
                    <Link className="" to="/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        style={{ fontSize: "32px", color: "gray" }}
                        fill="currentColor"
                        className="bi bi-facebook"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                      </svg>
                    </Link>
                  </li>
                  <li className="mx-3">
                    <Link className="" to="/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        style={{ fontSize: "32px", color: "gray" }}
                        fill="currentColor"
                        className="bi bi-github"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-4 offset-1 d-flex justify-content-center align-items-center mt-4">
              <img
                src="/images/footer-banner.png"
                width={250}
                className="rounded-2"
                alt="Brand Logo"
              />
            </div>

            <div className="col-md-6 offset-1">
              <p className="pt-4 mt-4">
                &copy;
                {new Date().getFullYear()} : Powered by{" "}
                <NavLink to="/" className="link">
                  <span className="text-info bg-dark">BlogBooth</span>
                </NavLink>{" "}
                All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
