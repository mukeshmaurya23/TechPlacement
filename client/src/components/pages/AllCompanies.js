import React, { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
import Card from "../../UI/Card";

import Footer from "../Footer/Footer";
//import data from "../Data/data.json";
import styles from "./AllCompanies.module.css";
import checkbox from "../../images/checkbx.png";
import { Link } from "react-router-dom";
import Axios from "axios";
import useFetch from "../../hooks/useFetch";
import Shimmer from "../../UI/Shimmer";
import { HOME_DATA } from "../../constant";

const AllCompanies = (props) => {
  // const [foundUser, setFoundUser] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { data: foundUser, loading, error } = useFetch(HOME_DATA);
  const dummy_items = [
    {
      id: 1,
      title: "Get Placed in your dream company",
    },
    {
      id: 2,
      title: "Most Visited Website for Job Seekers",
    },
    {
      id: 3,
      title: "100+ Comapnies and jobs available",
    },
  ];

  // const createImageLink = (link) => {
  //   var imageLinkIntial = "https://drive.google.com/uc?export=view&id=";
  //   var imageLink = imageLinkIntial.concat(
  //     link.substring(32, link.lastIndexOf("/"))
  //   );
  //   console.log("gdrive link", imageLink);
  //   return imageLink;
  // };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="conatiner p-3 mt-auto">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-10 pt-lg-5 pt-md-0 ">
            <div className="conatiner p-3">
              <h1 className="pt-md-0 pt-lg-3 ">
                <span
                  className="highlight-text pe-2"
                  style={{ color: "orange" }}
                >
                  Latest
                </span>
                offcampus jobs and internships updates.
              </h1>
              <h4>
                Here you will find the latest offcampus jobs and internships
                updates. We mainly focus on students and freshers jobs although
                you may find few experienced job updates as well.
              </h4>

              {/* <div className={styles.imageWrap}>
                <img
                  src={TechPlacement}
                  alt="tech"
                  className="image-fluid"
                ></img>
              </div> */}
            </div>
            <Link to="/coursePage">
              <button className={styles.prepareButton}>
                <span>Start Preparing </span>
              </button>
            </Link>
          </div>

          <div className="col-lg-5 col-md-10">
            {/* <img
              src={latest}
              className="img-fluid"
              alt="coding "
              style={{ overflow: "hidden", height: "24rem" }}
            /> */}

            <div className="text-center mt-4 p-2">
              {dummy_items.map((item) => (
                <div className={`${styles.card} card max-auto`}>
                  <div className="card-body flex">
                    <div className={styles.leftIMage}>
                      <img src={checkbox} alt="announce"></img>
                    </div>
                    <div className={styles.rightText}>
                      <p className={styles.titletext}>{item.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.search}>
          <div className="input-group rounded p-5 col-lg-6 col-md-10 mx-auto">
            <input
              style={{
                backgroundColor: "rgb(230, 230, 250)",
                padding: "0.75rem",
                zIndex: "0",
                borderRadius: "0.5rem",
                border: "none",
              }}
              type="search"
              value={search}
              onChange={handleChange}
              className="form-control rounded"
              placeholder="Search 'Amazon' 'Flipkart'"
              aria-label="Search"
              aria-describedby="search-addon"
            />
          </div>
        </div>

        <div
          style={{
            background: "rgb(241, 243, 255)",
            marginLeft: "8px",
            padding: "8px",
          }}
        >
          <div className="row row-cols-sm-4 mt-2 p-0">
            {!loading &&
            foundUser &&
            foundUser.length > 0 &&
            foundUser.filter((item) =>
              item.title.toLowerCase().includes(search)
            ).length > 0 ? (
              foundUser
                .filter((item) => item.title.toLowerCase().includes(search))
                .sort((a, b) => {
                  return new Date(b.timestamp) - new Date(a.timestamp);
                })
                .map((item) => {
                  return (
                    <div className="col" key={item.id}>
                      <Card
                        title={item.title}
                        //image={createImageLink(item.image)}
                        image={item.image}
                        description={item.description}
                        link={item.link}
                      />
                    </div>
                  );
                })
            ) : (
              <h2 className="p-2">No Data Found</h2>
            )}
          </div>
        </div>
      </div>
      {loading && <Shimmer />}
      {error && <h2>{error}</h2>}
      <Footer />
    </>
  );
};

export default AllCompanies;
