import React from "react";
import "./components.css";

const LikeBlog = ({ handleLike, proplikes }) => {
  //   const [likes, setLikes] = useState(0);

  return (
    <>
      <div className="d-flex mx-auto justify-content-evenly w-50">
        <h5 className="fs-3 m-3">Like a Post :</h5>
        <button
          className="badge rounded-pill bg-secondary btn-sm m-2 px-5 onHoverBtn "
          onClick={handleLike}
        >
          L i k e
        </button>
        <p className="fs-3 m-3">( {proplikes} )</p>
      </div>
      <hr className="w-50 mx-auto" />
    </>
  );
};

export default LikeBlog;
