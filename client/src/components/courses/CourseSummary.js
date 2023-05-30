import { Link } from "react-router-dom";
//import courses from "./courses";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./CourseSummary.module.css";
import Shimmer from "../../UI/Shimmer";
import useFetch from "../../hooks/useFetch";
import { GET_COURSE } from "../../constant";
function CourseSummary(props) {
  // const [courses, setCourseFound] = useState([]);
  // const [loading, setIsLoading] = useState(false);

  const { data: courses, error } = useFetch(GET_COURSE);

  return courses.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      {courses.map((course) => (
        <div class="container p-2" key={course._id}>
          <main class={styles.grid}>
            <article>
              <div className="text-center">
                <img
                  src={course.image}
                  alt="Sample"
                  style={{
                    height: "100px",
                    width: "100px",
                    borderRadius: "50%",
                    margin: "10px",
                  }}
                />
              </div>
              <div class={styles.text}>
                <h3>
                  <Link
                    className="no-underline cursor-pointer text-decoration-none "
                    style={{ color: "#000", fontWeight: "700" }}
                    to={"/courses/" + course._id}
                  >
                    {course.title}
                  </Link>
                </h3>
                <p>Created by {course.by}</p>
                <div class={styles.price}>
                  <span>$99</span> {course.price}
                </div>
                <div className="mt-2">
                  <Link
                    to={"/courses/" + course._id}
                    className="btn btn-primary"
                    id={course._id}
                    style={{ borderRadius: "15px" }}
                  >
                    Enroll
                  </Link>
                </div>
              </div>
            </article>
          </main>
        </div>
      ))}
      {error && <div>{error}</div>}
    </>
  );
}
/*
   <div class={styles.card} key={props.course.id}>
        <div className="text-center">
          <img
            src={props.course.image}
            alt="..."
            style={{ height: "100px", width: "100px" }}
          />
        </div>
        <div class={styles.cardHeader}>
          <div class={styles.content}>
            <h1>
              <Link
                className="no-underline cursor-pointer text-decoration-none"
                to={"/courses/" + props.course.id}
              >
                {props.course.title}
              </Link>
            </h1>
            <p>
              <Link
                className="no-underline cursor-pointer text-truncate"
                style={{ textDecoration: "none", color: "#000" }}
                to={"/courses/" + props.course.id}
              >
                {props.course.description}
              </Link>
            </p>
          </div>
        </div>
        <div class={styles.cardInfo}>
          <p>
            <span class="fa fa-users"></span>TechPlacement Team
          </p>
          <p>Duration : 5h 21m</p>
        </div>
        <div class={styles.cardFooter}>
          <span class="fa fa-star-o"></span>
          <button className="btn btn-primary">
            <Link
              to={"/courses/" + props.course.id}
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Enroll
            </Link>
          </button>
        </div>
      </div>

 <div class="row" key={props.course.id}>
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              {" "}
              <Link
                className="no-underline cursor-pointer text-decoration-none"
                to={"/courses/" + props.course.id}
              >
                {props.course.title}
              </Link>
            </h5>
            <img src={props.course.image} class="card-img-top" alt="..." />

            <p class="card-text text-truncate">
              <Link
                className="no-underline cursor-pointer"
                style={{ textDecoration: "none", color: "#000" }}
                to={"/courses/" + props.course.id}
              >
                {props.course.description}
              </Link>
            </p>
            <Link to={"/courses/" + props.course.id} class="btn btn-primary">
              Enroll
            </Link>
          </div>
        </div>
      </div>
    </div>
*/
export default CourseSummary;
