import React, { useEffect, useState } from "react";
import DashboardPage from "./DashboardPage";
import { Link } from "react-router-dom";
import axios from "axios";
import Avatar from "react-avatar";

const ShowAllComments = () => {
  const [contacts, setContacts] = useState("");
  const [page, setPage] = useState(1);
  const [dataLength, setDataLength] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  // const token = localStorage.getItem("token").slice(1, -1);
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  async function fetchData() {
    await axios
      .get(`http://localhost:8080/api/contact/get-all-messages?page=${page}`)
      .then((res) => {
        setContacts(res.data.contact);
        setDataLength(res.data.contactCount);
        setTotalPages(Math.ceil(res.data.contactCount / 6));
      });
  }
  useEffect(() => {
    fetchData();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/contact/delete-message/${id}`
      );
      // .then((res) => {
      //   // console.log(res.data.message);
      // });
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };

  function handlePaginationClick(newPage) {
    window.scrollTo(0, 0);
    setPage(newPage);
  }

  const paginationButtons = [];
  for (let i = 0; i <= totalPages + 1; i++) {
    if (i === 0) {
      paginationButtons.push(
        <button
          key={"first"}
          className={`btn btn-secondary mx-3 px-4 ${
            page === 1 ? "disabled" : ""
          }`}
          onClick={() => {
            handlePaginationClick(1);
          }}
          disabled={page === 1}
        >
          <i className="fa-solid fa-less-than"></i>
        </button>
      );
    } else if (i === totalPages + 1) {
      paginationButtons.push(
        <button
          key={"last"}
          className={`btn btn-secondary mx-3 px-4 ${
            page === totalPages ? "disabled" : ""
          }`}
          onClick={() => {
            handlePaginationClick(totalPages);
          }}
          disabled={page === totalPages}
        >
          <i className="fa-solid fa-greater-than"></i>
        </button>
      );
    } else {
      paginationButtons.push(
        <button
          key={i}
          className={`btn btn-secondary mx-3 px-4 ${
            i === page ? "active" : ""
          }`}
          onClick={() => {
            handlePaginationClick(i);
          }}
        >
          {i}
        </button>
      );
    }
  }

  return (
    <DashboardPage>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h3 className="display-5 py-3 border-bottom">
              All Messages
              <small className="fs-4 ">
                {" "}
                ({dataLength ? dataLength : "0"})
              </small>
              <small className="fs-6 float-end m-4 p-1">Page No. {page}</small>
            </h3>
          </div>
          {/* =========Start There===================================== */}
          {/* <div className="" style={{ height: "75vh", with: "100%" }}>
            <div className="d-flex justify-content-center ">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div> */}
          <div className="row">
            {contacts && contacts.length > 0 ? (
              contacts.map((contact) => {
                const date = new Date(contact?.createdAt);
                const options = {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                };
                const formattedDate = date.toLocaleString("en-US", options);

                return (
                  <div
                    key={contact._id}
                    className="card m-2 bg-light"
                    style={{ width: "300px", height: "auto" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">
                        <div className="row">
                          <div className="col-md-3">
                            <Avatar
                              name={contact.name}
                              textSizeRatio={2}
                              size="40"
                              round={true}
                            />
                          </div>
                          <div className="col-md-9">
                            <h5 className="card-title">{contact.name}</h5>
                            <h6 className="card-text text-muted ">
                              {contact.email}
                            </h6>
                          </div>
                        </div>
                      </h5>
                      <hr />

                      <div className="">
                        <small className="card-subtitle me-2 text-muted">
                          Subject:
                        </small>
                        <small className="card-subtitle fw-bold text-dark">
                          {contact.subject}
                        </small>
                      </div>

                      <small className="card-subtitle me-2 text-muted">
                        Message:
                      </small>
                      <small className="card-subtitle  text-dark">
                        {contact.message}
                      </small>
                    </div>
                    <div
                      className="card-footer d-flex justify-content-between align-items-center mt-3"
                      style={{ marginBottom: "5px" }}
                    >
                      <small className="card-subtitle text-muted m-0">
                        {formattedDate}
                      </small>
                      <button
                        onClick={() => handleDelete(contact._id)}
                        className="btn btn-secondary"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="" style={{ height: "75vh", with: "100%" }}>
                <div className="d-flex justify-content-center ">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="d-flex justify-content-center mt-4">
            {paginationButtons}
          </div>
          {/* ======================Extra======================================= */}
        </div>
      </div>
    </DashboardPage>
  );
};

export default ShowAllComments;
