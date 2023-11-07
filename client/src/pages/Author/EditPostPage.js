import React, { useRef, useState, useEffect } from "react";
import DashboardPage from "./DashboardPage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditPostPage = () => {
  const editor = useRef(null);
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [featurePost, setFeaturePost] = useState(false);

  const [categories, setCategories] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (file instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageUrl(`http://localhost:8080/${file}`);
    }
  }, [file]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/blog/get-blog/${id}`
        );
        setTitle(data.blog.title);
        setContent(data.blog.content);
        setCategory(data.blog.category);
        setFile(data.blog.path);
        setFeaturePost(data.blog.featurePost);

        // console.log(data.blog);
        // console.log(res.data.category);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchBlog();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/category/get-all"
        );
        setCategories(data.category);
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
      const { data } = await axios.put(
        `http://localhost:8080/api/blog/update-blog/${id}`,
        formData
      );

      // console.log(data);
      if (data.success === true) {
        toast.success("Post Created Successfully");
        navigate("/show-all-posts");
      } else {
        toast.error(data.message);
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
                <h5 className="card-title display-5 ">Edit Post</h5>
                <p className="card-text d-flex pt-3">
                  <label className=" fs-3 me-5" style={{ width: "15%" }}>
                    Title:
                  </label>
                  <input
                    type="text"
                    className="form-control fs-3"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </p>
                <div className="d-flex">
                  <label className=" fs-3 me-5  m-0" style={{ width: "15%" }}>
                    Category:
                  </label>
                  <select
                    className="form-select form-control form-select-lg mb-3"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option className="fs-3">Choose Category</option>
                    {categories &&
                      categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="card-text py-2">
                  <label className=" fs-3 me-3" style={{ width: "15%" }}>
                    Image:
                  </label>
                  <img
                    // src={`http://localhost:8080/${file}`}
                    src={imageUrl}
                    alt="Preview"
                    style={{ width: "350px" }}
                    className="img-thumbnail rounded mb-3"
                  />
                  <input
                    type="file"
                    className="form-control fs-3 ms-auto"
                    style={{ width: "84%" }}
                    // required
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                <div className="card-text m-1 mb-3 form-control">
                  <div className="form-check form-switch ps-5 ms-5 ">
                    <label
                      className="form-check-label fs-4 ms-3"
                      htmlFor="flexSwitchCheckDefault"
                    >
                      Mark as Feature Post
                    </label>

                    <input
                      checked={featurePost}
                      className="form-check-input form-control fs-3"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      onChange={() => {
                        setFeaturePost(featurePost ? false : true);
                      }}
                    />
                  </div>
                </div>
                <div className="card-text">
                  <label className=" fs-3 me-5" style={{ width: "25%" }}>
                    Post Content:
                  </label>
                  <ReactQuill
                    ref={editor}
                    className="fs-3"
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    placeholder={"Post Content Type Here ..."}
                  />
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

export default EditPostPage;
