import React, { useRef, useState, useEffect } from "react";
// import JoditEditor from "jodit-react";
import DashboardPage from "./DashboardPage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateNewPost = () => {
  const editor = useRef(null);

  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [featurePost, setFeaturePost] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const token = localStorage.getItem("token").slice(1, -1);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/category/get-all",
          config
        );
        setCategories(res.data.category);
        // console.log(res.data.category);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("file", file);
      formData.append("category", category);
      formData.append("featurePost", featurePost);

      // console.log(formData);
      const res = await axios.post(
        "http://localhost:8080/api/blog/create-blog",
        formData
      );
      if (res.data.success === true) {
        // console.log(res.data);
        toast.success("Post Created Successfully");
        navigate("/show-all-posts");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <DashboardPage>
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="w-100">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title display-5 text-center">
                  Create New Post
                </h5>
                <p className="card-text pt-3">
                  <input
                    type="text"
                    className="form-control fs-3"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </p>
                <select
                  className="form-select form-control form-select-lg mb-3"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option defaultValue className="fs-3">
                    Choose Category
                  </option>
                  {categories &&
                    categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                </select>

                <p className="card-text py-3">
                  <input
                    type="file"
                    className="form-control fs-3"
                    required
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </p>
                <div className="card-text m-1 mb-3 form-control">
                  <div className="form-check form-switch ps-5 ms-5 ">
                    <label
                      className="form-check-label fs-4 ms-3"
                      htmlFor="flexSwitchCheckDefault"
                    >
                      Mark as Feature Post
                    </label>

                    <input
                      value={featurePost}
                      className="form-check-input form-control fs-3"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      onChange={(e) => {
                        setFeaturePost(featurePost ? false : true);
                      }}
                    />
                  </div>
                </div>

                <div className="card-text">
                  <ReactQuill
                    ref={editor}
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    placeholder={"Post Content Type Here ..."}
                  />
                  {/* <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    className="form-control fs-3"
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={(newContent) => {}}
                    style={{ minHeight: "300px" }}
                  /> */}
                </div>

                <p className="card-text pt-3 ">
                  <button
                    onClick={handleSubmit}
                    className=" form-control btn btn-secondary fs-4"
                  >
                    Create Post
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardPage>
  );
};

export default CreateNewPost;
