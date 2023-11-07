import React, { useCallback, useEffect, useState } from "react";
import DashboardPage from "./DashboardPage.js";
import axios from "axios";
// import { toast } from "react-toastify";

const CategoryPage = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [delMessage, setDelMessage] = useState("");
  // const [editMessage, setEditMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadDel, setLoadDel] = useState(false);
  // const [loadEdit, setLoadEdit] = useState(false);
  const [singleCat, setSingleCat] = useState({});
  // const [catId, setCatid] = useState(null);
  const [categories, setCategories] = useState([]);
  const [delIndex, setDelIndex] = useState("");

  if (error || message || delMessage) {
    setTimeout(() => {
      setError("");
      setMessage("");
      setDelMessage("");
      // setEditMessage("");
    }, 3000);
  }

  // ------------test ----------------------------------------------------------------------

  // useEffect(() => {
  //   if (error || message || delMessage || editMessage) {
  //     const timeout = setTimeout(() => {
  //       setError("");
  //       setMessage("");
  //       setDelMessage("");
  //       setEditMessage("");
  //     }, 3000);

  //     return () => clearTimeout(timeout);
  //   }
  // }, [error, message, delMessage, editMessage]);

  // ------------test ----------------------------------------------------------------------

  const handleClick = useCallback(
    async ({ name }) => {
      try {
        setLoading(true);
        const res = await axios.post(
          "http://localhost:8080/api/category/create",
          {
            name: name,
          }
        );
        if (res.data.success === true) {
          // toast.success("Category Created Successfully");
          setLoading(false);
          setMessage(res.data.message);
          setName("");
        } else {
          setError(res.data.message);
          // console.log(res.data.message);
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        // console.log(error.message);
        setLoading(false);
      }
    },
    [name]
  );

  const handleDelete = useCallback(async (id, index) => {
    try {
      setDelIndex(index);
      setLoadDel(true);
      const res = await axios.delete(
        `http://localhost:8080/api/category/delete/${id}`
      );
      if (res.data.success === true) {
        // toast.success("Category Deleted Successfully");
        setLoadDel(false);
        setDelIndex("");
        setDelMessage(res.data.message);
      } else {
        setDelMessage(res.data.message);
        setDelIndex("");
        setLoadDel(false);
      }
    } catch (error) {
      setDelMessage(error.message);
      setLoadDel(false);
      setDelIndex("");
    }
  }, []);

  const showInModel = useCallback(async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/category/get/${id}`
      );

      if (res.data.success === true) {
        setSingleCat(res.data.category);
      } else {
        // console.log(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  // const handleEdit = useCallback(async (id) => {
  //   try {
  //     setLoadEdit(true);
  //     const data = singleCat.name;
  //     const res = await axios.post(
  //       `http://localhost:8080/api/category/update/${id}`,
  //       data
  //     );
  //     if (res.data.success === true) {
  //       // toast.success("Category Deleted Successfully");
  //       setLoadEdit(false);
  //       setEditMessage(res.data.message);
  //       console.log(res.data.message);
  //     } else {
  //       setEditMessage(res.data.message);
  //       console.log(res.data.message);
  //       setLoadEdit(false);
  //     }
  //   } catch (error) {
  //     setEditMessage(error.message);
  //     setLoadEdit(false);
  //   }
  // }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/category/get-all"
        );
        setCategories(res.data.category);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCategories();
  }, [loading, delMessage]);

  return (
    <DashboardPage>
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="w-100">
            {/* =================Add Category section ================= */}
            {/* <hr className="card-title ms-0 ps-0 "></hr> */}
            <h3 className="card-title ms-0 ps-0  ">Create New Category</h3>

            <div className=" mb-0">
              <div className="card-body mb-0">
                {error && <p className="text-danger m-1">{error}</p>}
                {message && <p className="text-success m-1">{message}</p>}

                <form className="d-flex">
                  <div className="card-text w-75 pt-2 mb-1 pb-0">
                    <input
                      type="text"
                      className="form-control fs-4"
                      placeholder="Category Name ..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="card-text pt-2 ">
                    <button
                      onClick={() => handleClick({ name })}
                      className="btn btn-secondary fs-4"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        "Add New Category"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* =================Add Category end section ================= */}

        {/* =================Add Table section ================= */}

        <div className="row mt-5">
          {/* <hr className="card-title "></hr> */}

          <h3 className="card-title ms-0 ps-0 ">Category List</h3>
          <div
            className="bg-light"
            style={{ maxHeight: "380px", overflow: "scroll" }}
          >
            <div
              className="text-center w-50 mx-auto"
              style={{ height: "15px" }}
            >
              {delMessage && <p className="text-success m-1">{delMessage}</p>}
            </div>
            <table className="table table-striped table-hover mt-3">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Category Name</th>
                  <th scope="col" className="text-center">
                    Edit
                  </th>
                  <th scope="col" className="text-center">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories && categories ? (
                  categories.map((category, index) => (
                    <tr key={category._id}>
                      <th scope="row">{index + 1}</th>
                      <th>{category.name}</th>

                      <th className="text-center">
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => showInModel(category._id)}
                        >
                          Edit
                        </button>
                        {/* <button
                          className="btn btn-info btn-sm"
                          onClick={() => {
                            handleEdit(category._id);
                          }}
                        >
                          {loadEdit ? (
                            <div className="spinner-border" role="status">
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          ) : (
                            "Edit"
                          )}
                        </button> */}
                      </th>
                      <th className="text-center">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(category._id, index)}
                          disabled={delIndex === index && loadDel}
                        >
                          {delIndex === index && loadDel ? (
                            <div className="spinner-border" role="status">
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          ) : (
                            "Delete"
                          )}
                        </button>
                      </th>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>
                      <h2 className="text-center">No Category Found! </h2>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* =================Add Table section ================= */}

        {/* ==============Model====================== */}
        <div>
          {/* Button trigger modal */}

          {/* Modal */}
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Edit Category
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <input
                  className="form-control mx-auto  px-3 my-2 w-75 "
                  value={singleCat.name}
                  onChange={(e) => setSingleCat(e.target.value)}
                  disabled
                />
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled
                    // onClick={handleEdit(singleCat._id)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==============Model====================== */}
      </div>
    </DashboardPage>
  );
};

export default CategoryPage;
