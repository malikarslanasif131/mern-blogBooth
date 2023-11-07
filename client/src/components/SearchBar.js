import React from "react";

const SearchBar = () => {
  return (
    <>
      <div
        className="input-group input-group-lg mx-auto mt-2 bg-light"
        // style={{ width: "33%" }}
      >
        <input
          type="text"
          style={{ outline: "none" }}
          className="form-control bg-light text-dark"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg"
        />
        <div
          className="input-group-append"
          // style={{ marginRight: "-40px", marginTop: "-1px" }}
        >
          <button className="btn btn-lg bg-light form-control  " type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
