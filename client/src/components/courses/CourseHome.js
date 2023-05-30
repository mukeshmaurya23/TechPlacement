import React, { useState, useContext } from "react";
import courses from "./courses";
import CourseSummary from "./CourseSummary";
import announce from "../../images/latest.svg";
import CourseBanner from "./courseBanner/CourseBanner";
import NewsTicker from "../../UI/NewsTicker";
import styles from "./CourseHome.module.css";
import algorithm from "../../images/algorithm.svg";
import { Link } from "react-router-dom";

const CourseHome = () => {
  return (
    <div className="container ">
      <CourseBanner />

      <div
        style={{
          marginTop: "2rem",
          backgroundColor: "black",
          textAlign: "center",
          padding: "1rem",
        }}
      >
        <h1
          style={{
            color: "#fff",
          }}
        >
          My Learning
        </h1>

        <ul
          className={styles.list}
          style={{
            listStyle: "none",
            display: "flex",
            justifyContent: "flex-start",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: "700",
          }}
        >
          <li
            style={{
              marginRight: "2rem",
            }}
          >
            All Courses
          </li>
          <li
            style={{
              marginRight: "2rem",
            }}
          >
            My List
          </li>
          <li
            style={{
              marginRight: "2rem",
            }}
          >
            WishList
          </li>
        </ul>
      </div>

      <div className="p-3">
        <p style={{ fontSize: "2rem", fontWeight: "700" }}>
          What to Learn Next
        </p>
        <p style={{ fontSize: "1.5rem", fontWeight: "700" }}>
          Our top pick for you
        </p>

        <div className="row row-cols-lg-3">
          <CourseSummary />
        </div>
        <hr />
        <p style={{ fontSize: "2rem", fontWeight: "700" }}>All Courses</p>

        <div className="row row-cols-lg-3">
          <div className="col">
            <div
              className="card text-center"
              style={{
                borderRadius: "15px",
                backgroundColor: "#fff",
                boxShadow: "2px 2px 6px 0px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="card-body">
                <h5
                  className="card-title"
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                  }}
                >
                  Sorting Algorithm
                </h5>

                <img
                  src={algorithm}
                  className="card-img-top"
                  alt="..."
                  style={{ height: "100px", width: "100px" }}
                />
                <p className="card-text">
                  Sorting Algorithm is a technique to sort the data in a
                  particular order. here we will learn about the different
                  sorting algorithm.
                </p>
                <Link to={"/algo-dsa"} className="btn btn-primary">
                  View
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default CourseHome;
