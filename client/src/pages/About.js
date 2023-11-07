import React from "react";
import Layout from "../components/layout/Layout";
import ReactCarousel from "../components/ReactCarousel";

const About = () => {
  return (
    <Layout>
      <div className="container-fluid" style={{ backgroundColor: "#f5f5f5 " }}>
        <div className="row ">
          <div className="col-md-8 mx-auto">
            <img
              src="/images/logo-banner-dark.png"
              alt=""
              className="img-fluid rounded-3 my-2"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
      <div className="container-fluid" style={{ backgroundColor: "#f5f5f5 " }}>
        <div className="row ">
          <div className="col-md-10 mx-auto">
            <h3 className="display-6 mt-5">About BlogBooth :</h3>
            <p className=" my-3 fs-4">
              &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;
              &emsp; BlogBooth is Pakistan's largest independent news publisher.
              A leader in technology and telecom, it lends the same expertise in
              its comprehensive coverage of business, the automotive industry,
              technology, startups, sports, and other news.
            </p>
          </div>
          <hr className="w-50 mx-auto my-3 text-dark" />
        </div>
      </div>
      <ReactCarousel />
      {/* <hr className="w-50 mx-auto my-5 text-dark" /> */}
      <div className="container-fluid" style={{ backgroundColor: "#f5f5f5 " }}>
        <div className="row ">
          <div className="col-md-10 mx-auto">
            <h3 className="display-6 mt-5">
              <b>Our Team</b>
            </h3>
            <p className=" my-5 fs-4">
              Aadil Shadman studied in the UK and joined ProPakistani in 2015.
              He is a crucial member of the core team that led ProPakistani’s
              explosive growth towards becoming the country's top digital
              publisher.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
