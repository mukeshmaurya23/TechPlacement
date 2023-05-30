import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../UI/Card";
import img1 from "../../images/codingImg.png";
import Spinner from "../../UI/Spinner";
import Footer from "../Footer/Footer";
import Testimonial from "../../UI/Testimonial";
//import { AuthContext } from "../store/auth-login";
//import data from "../Data/data.json";
import { useNavigate } from "react-router-dom";
import SidePage1 from "../SidePages/SidePage1";
import SidePages2 from "../SidePages/SidePages2";
import SidePage3 from "../SidePages/SidePage3";
import useMediaQuery from "../../hooks/useMediaQuery";
import Shimmer from "../../UI/Shimmer";
import useFetch from "../../hooks/useFetch";
import { HOME_DATA } from "../../constant";
const Home = () => {
  const { data, loading, error } = useFetch(HOME_DATA);
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("/allcomapnies");
  };
  // const createImageLink = (link) => {
  //   var imageLinkIntial = "https://drive.google.com/uc?export=view&id=";
  //   var imageLink = imageLinkIntial.concat(
  //     link.substring(32, link.lastIndexOf("/"))
  //   );
  //   return imageLink;
  // };

  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <>
      <div
        className="conatiner"
        style={{
          padding: "1.5rem",
        }}
      >
        {isMobile ? (
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-10 pt-lg-5 pt-md-0">
              <h1 className="pt-md-0 pt-lg-3 mt-3">
                <span
                  className="highlight-text pe-2"
                  style={{ color: "orange" }}
                >
                  100+
                </span>
                product and Service based <br />
                companies and startups <br />
                that pay well.
              </h1>

              <h1>
                Plus, latest offcampus jobs <br />
                and internships updates!!
              </h1>
            </div>

            <div className="col-lg-4 col-md-10">
              <img
                src={img1}
                className="img-fluid"
                alt="coding "
                style={{ overflow: "hidden" }}
              />
            </div>
          </div>
        ) : (
          <SidePage3 />
        )}
        <h5 className="text-center mt-5 p-4 font-weight-bold">
          TechPlacement - Helping People get their Dream Jobs!
        </h5>
        <div className="container">
          <Testimonial />
        </div>

        {/* <SidePages2 /> */}
        <div
          className=" row justify-content-center "
          style={{
            background: "rgb(241, 243, 255)",
            borderRadius: "5px",
          }}
        >
          <div
            style={{
              padding: "1rem",
            }}
          >
            <h1 className="mb-3">Companies that pay well</h1>
            <p className="h5">
              Here you will find all the product /Service based companies and
              startups that pay well. This includes few service based companies
              too but all of them pay atleast
              <em className="p-2">4 LPA</em>
            </p>
            <button
              className="btn btn-primary rounded mt-3"
              onClick={navigateHandler}
            >
              <span>Explore</span>
            </button>

            <div className="row row-cols-lg-4 mt-3 p-0 ">
              {data
                .slice(-1 * 8)
                //sort data based on latest timestamp
                .sort((a, b) => {
                  return new Date(b.timestamp) - new Date(a.timestamp);
                })
                .map((item) => (
                  <Card
                    key={item.id}
                    image={item.image}
                    title={item.title}
                    description={item.description}
                    link={item.link}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      {loading && <Shimmer />}
      <div className="p-5">
        <h1 className="mb-4">OffCampus oppurtanities for you</h1>
        <h5 className="h-4 mb-3">
          Here you find latest offcampus oppurtanities details and internships
          updates
        </h5>
        {isMobile ? (
          <></>
        ) : (
          <Link to="/alljobs" className="btn btn-primary rounded mt-2">
            <span>View More</span>
          </Link>
        )}
        <span className="mt-2">
          <SidePage1 />
        </span>
      </div>
      {error && <div>{error}</div>}
      <Footer />
    </>
  );
};

export default React.memo(Home);
