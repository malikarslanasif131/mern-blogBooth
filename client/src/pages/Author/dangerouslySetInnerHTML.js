import React from "react";

function DisplayData(props) {
  return (
    <>
      <div
        className="overflow-hidden"
        dangerouslySetInnerHTML={{ __html: props.data }}
      ></div>
    </>
  );
}

export default DisplayData;
