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
    items: 4,
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

const ReactCarousel = () => {
  return (
    <div
      className="my-1"
      style={{ backgroundColor: "#36454f ", minHeight: "300px" }}
    >
      <h2 className="display-4 text-light pt-2 ps-3">Achievements</h2>
      <Carousel
        swipeable={true}
        arrows={false}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        // autoPlay={false}
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
        <div className="card m-3 p-2 " style={{ backgroundColor: "#367588" }}>
          <p className="m-2 p-2 text-light">
            Our 2016 report on the low quality of fuel in Pakistan spurred the
            government to urgently resolve the matter, to urgently resolve the
            matter, ending up in the introduction of RON92 and higher fuel in
            Pakistan.{" "}
          </p>
        </div>
        <div className="card m-3 p-2 " style={{ backgroundColor: "#d3d3d3" }}>
          <p className="m-2 p-2 text-dark">
            Our 2015 report was the catalyst for the PTA to address the issues
            of poor revenues, high taxation and regulatory hurdles in the
            telecom sector. we highlighted. PTA now plans on setting a price
            floor and has anti-competitive.
          </p>
        </div>
        <div className="card m-3 p-2 " style={{ backgroundColor: "#367588" }}>
          <p className="m-2 p-2 text-light">
            PakWired.com launched in 2014 by Hasan Saleem, a Pakistani serial
            entrepreneur. As a recognized leader in the online business
            community after founding several successful ventures, he launched
            PakWired as a hub of aspiring entrepreneurs in Pakistan.
          </p>
        </div>
        <div className="card m-3 p-2 " style={{ backgroundColor: "#d3d3d3" }}>
          <p className="m-2 p-2 text-dark">
            At PakWired we go beyond the traditional fluff and shallow analyses
            you often find on the web. We pride ourselves on being an authentic
            and trustworthy source of information about business, technology,
            and other those looking to become one.
          </p>
        </div>
        <div className="card m-3 p-2 " style={{ backgroundColor: "#367588" }}>
          <p className="m-2 p-2 text-light">
            PakWired aims to educate and inspire those with an entrepreneurial
            spirit, from freelance professionals to startup founders. We bring
            them insight from successful leaders who came before them,
            information on the the entrepreneurial life.
          </p>
        </div>
        <div className="card m-3 p-2 " style={{ backgroundColor: "#d3d3d3" }}>
          <p className="m-2 p-2 text-dark">
            At PakWired we go beyond the traditional fluff and shallow analyses
            you often find on the web. We pride ourselves on being an authentic
            and trustworthy source of information about business, technology,
            and other those looking to become one.
          </p>
        </div>
      </Carousel>
    </div>
  );
};

export default ReactCarousel;
