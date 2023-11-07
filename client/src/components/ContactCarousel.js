import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ContactCarousel = () => {
  return (
    <div
      className=""
      style={{ backgroundColor: "#36454f ", minHeight: "290px" }}
    >
      <h2 className="p-3 display-3 text-center text-light">
        Welcome to BlogBooth
      </h2>
      <Carousel
        swipeable={false}
        arrows={false}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="ease 300"
        transitionDuration={1500}
        containerClass="carousel-container"
        // removeArrowOnDeviceType={true}
        // deviceType={deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        <div
          className="d-flex justify-content-center align-items-center m-3 p-2 "
          style={{ backgroundColor: "#367588" }}
        >
          <p className="display-6 text-center align-middle m-2 p-2 text-light">
            <span className="align-middle">Your message matters.</span>
          </p>
        </div>
        <div
          className="d-flex justify-content-center align-items-center m-3 p-2 "
          style={{ backgroundColor: "#d3d3d3" }}
        >
          <p className="display-6 text-center align-middle m-2 p-2 text-dark">
            Join the journey.
          </p>
        </div>
        <div
          className="d-flex justify-content-center align-items-center m-3 p-2 "
          style={{ backgroundColor: "#367588" }}
        >
          <p className="display-6 text-center align-middle m-2 p-2 text-light">
            Drop us a line.
          </p>
        </div>
        <div
          className="d-flex justify-content-center align-items-center m-3 p-2 "
          style={{ backgroundColor: "#d3d3d3" }}
        >
          <p className="display-6 text-center align-middle m-2 p-2 text-dark">
            Reach us anytime.
          </p>
        </div>
        <div
          className="d-flex justify-content-center align-items-center m-3 p-2 "
          style={{ backgroundColor: "#367588" }}
        >
          <p className="display-6 text-center  m-2 p-2 text-light">
            We're listening now.
          </p>
        </div>
        <div
          className="d-flex justify-content-center align-items-center m-3 p-2 "
          style={{ backgroundColor: "#d3d3d3" }}
        >
          <p className="display-6 text-center align-middle m-2 p-2 text-dark">
            Don't be shy.
          </p>
        </div>
      </Carousel>
    </div>
  );
};

export default ContactCarousel;
