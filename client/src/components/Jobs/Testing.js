import React, { useState, useEffect, useContext } from "react";
//import ScriptTag from "react-script-tag";
import axios from "axios";
import styles from "./Testing.module.css";
import { Link } from "react-router-dom";
import Modal from "../../UI/Modal";
import salary from "../../images/salary.png";
import { AuthContext } from "../store/auth-login";
import AddJob from "../../adminDashboard/AddJob";
import { toast } from "react-toastify";
import AddTestimonial from "../../UI/AddTestimonial";
import { FAV_JOBS, GET_JOBS } from "../../constant";
const Testing = () => {
  //write a logic for open description page on click of job card

  const [jobs, setJobs] = useState([]);
  const [Id, setId] = useState();
  const [imageFailures, setImageFailures] = useState([]);

  const handleError = (id) => {
    setImageFailures([...imageFailures, id]);
  };
  //make state for storing id of job

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [setSortAlphabetically] = useState(false);
  const [setSortbyDate] = useState(false);
  const [sortType, setSortType] = useState("");
  const [isModal, setModal] = useState(false);
  const [isModalJob, setModalJob] = useState(false);
  const [isModalResume, setModalResume] = useState(false);
  const [isModalTestimonial, setModalTestimonial] = useState(false);

  useEffect(() => {
    axios
      .get(GET_JOBS)
      .then((res) => {
        setLoading(false);
        setJobs(res.data);
        //count the number of jobs

        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addFav = async (e) => {
    const id = e.target.id;
    console.log(id);
    alert(e.target.id);
    const url = `${FAV_JOBS}/${id}`;
    axios
      .put(url)
      .then((res) => {
        setLoading(false);
        toast.success("Added to fav");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        alphabetically: "location",
        date: "date",
        role: "role",
      };
      const sortProperty = types[type];
      const sorted = [...jobs].sort((a, b) =>
        a[sortProperty] > b[sortProperty] ? 1 : -1
      );
      setJobs(sorted);
    };
    sortArray(sortType);
  }, [sortType]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const openModalResume = () => {
    window.scrollTo(0, 0);
    setModalResume(true);
  };
  const closeModalResume = () => {
    setModalResume(false);
  };
  const openModalJob = () => {
    setModalJob(true);
  };
  const closeModalJob = () => {
    setModalJob(false);
  };
  const openModalTestimonial = () => {
    setModalTestimonial(true);
  };
  const closeModalTestimonial = () => {
    setModalTestimonial(false);
  };

  const addDetailPage = (e) => {
    console.log("open description page");
    // alert(e.target.id);

    jobs.map((job) => {
      // alert(job._id);
      setId(e.target.id);

      const wrapper = document.querySelector(`.${styles.wrapper}`);
      const header = document.querySelector(`.${styles.header}`);
      wrapper.classList.add(`${styles["detail-page"]}`);
      const jobbg = document.querySelector(`.${styles["job-bg"]}`);
      const number = Math.floor(Math.random() * 10);
      const url = `https://unsplash.it/640/425?image=${number}`;
      jobbg.style.backgroundImage = `url(${url})`;
      wrapper.addEventListener("scroll", (e) => {
        window.scrollTo(0, 0);
        e.target.scrollTop > 30
          ? header.classList.add("header-shadow")
          : header.classList.remove("header-shadow");
      });
      //on double click remove ${styles["detail-page"]} from wrapper class
      wrapper.addEventListener("dblclick", () => {
        wrapper.classList.remove(`${styles["detail-page"]}`);
      });
    });
  };
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(6);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);
  const lastPage = () => setCurrentPage(Math.ceil(jobs.length / jobsPerPage));
  const firstPage = () => setCurrentPage(1);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(jobs.length / jobsPerPage); i++) {
    pageNumbers.push(i);
  }
  const renderPageNumbers = pageNumbers.map((number) => {
    if (number === currentPage) {
      return (
        <li key={number} className={styles.active}>
          {number}
        </li>
      );
    } else {
      return (
        <li key={number} onClick={() => paginate(number)}>
          {number}
        </li>
      );
    }
  });

  const [state] = useContext(AuthContext);

  return (
    <>
      <div class={styles.job}>
        <div class={styles.header}>
          <div class={styles["header-menu"]}>
            <a href="#" class={styles.active}>
              Find Job
            </a>
            <Link to="/company-review/comment">Company Review</Link>
            {isModal && (
              <Modal closing={closeModal}>
                <>
                  <pre>
                    <h6>If You Want to find Salary for any companies </h6>
                  </pre>

                  <pre>
                    <h6>Search e.g SDE 1 Adobe Leetcode on browser</h6>
                  </pre>
                  <img
                    src={salary}
                    alt=""
                    style={{ width: "120%", height: "50vh" }}
                  />
                </>
              </Modal>
            )}
            <Link to="#" onClick={openModal}>
              Find Salaries
            </Link>
          </div>
        </div>
        <div class={`${styles.wrapper} `}>
          <div class={styles["search-menu"]}>
            <div class={styles["search-bar"]}>
              <input
                type="text"
                class={styles["search-box"]}
                autofocus
                placeholder="Search for jobs"
                onChange={handleChange}
                value={search}
              />
              <div class={`${styles.search} `}></div>
            </div>
            <div class={styles["search-location"]}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class={`${styles.feather} ${styles["feather-map-pin"]}`}
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <select
                id="location-filter"
                onChange={(e) => setSortType(e.target.value)}
                className={`${styles.location} ${styles.selectlist}`}
              >
                <option selected="selected" value="">
                  All Locations
                </option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Bengalore">Bengalore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
              </select>
            </div>
            {isModalJob && (
              <Modal closing={closeModalJob} title="Add Jobs">
                <AddJob setModal={setModal} />
              </Modal>
            )}
            {(state && state.user && state.user.role === "admin") ||
            state.user.role === "recruiter" ? (
              <button class={styles["search-button"]} onClick={openModalJob}>
                Post Jobs
              </button>
            ) : (
              <button
                class={styles["search-button"]}
                onClick={openModalTestimonial}
              >
                Post Achivement
              </button>
            )}
          </div>
          {isModalTestimonial && (
            <Modal closing={closeModalTestimonial} title="Add Testimonial">
              <AddTestimonial setModal={setModal} />
            </Modal>
          )}
          <div class={styles["main-container"]}>
            <div class={styles["search-type"]}>
              <div class={styles.alert}>
                <div class={styles["alert-title"]}>Create Job Alert</div>
                <div class={styles["alert-subtitle"]}>
                  Create a job alert now and never miss a job
                </div>
                <input type="text" placeholder="Enter job keyword" />
                <button
                  class={styles["search-buttons"]}
                  onClick={() => {
                    toast.success("Job Alert Created Successfully");
                  }}
                >
                  Create Job Alerts
                </button>
              </div>
              <div class={styles["job-time"]}>
                <div class={styles["job-time-title"]}>Type of Employment</div>
                <div class={styles["job-wrapper"]}>
                  <div class={styles["type-container"]}>
                    <input
                      type="checkbox"
                      id="job1"
                      class={styles["job-style"]}
                      checked
                    />
                    <label for="job1">Full Time Jobs</label>
                  </div>
                  <div class={styles["type-container"]}>
                    <input
                      type="checkbox"
                      id="job2"
                      class={styles["job-style"]}
                    />
                    <label for="job2">Part Time Jobs</label>
                  </div>
                  <div class={styles["type-container"]}>
                    <input
                      type="checkbox"
                      id="job3"
                      class={styles["job-style"]}
                    />
                    <label for="job3">Remote Jobs</label>
                  </div>
                  <div class={styles["type-container"]}>
                    <input
                      type="checkbox"
                      id="job4"
                      class={styles["job-style"]}
                    />
                    <label for="job4">Internship Jobs</label>
                  </div>
                  <div class={styles["type-container"]}>
                    <input
                      type="checkbox"
                      id="job5"
                      class={styles["job-style"]}
                    />
                    <label for="job5">Contract</label>
                  </div>
                </div>
              </div>
              <div class={styles["job-time"]}>
                <div class={styles["job-time-title"]}>Seniority Level</div>
                <div class={styles["job-wrapper"]}>
                  <div class={styles["type-container"]}>
                    <input
                      type="checkbox"
                      id="job7"
                      class={styles["job-style"]}
                    />
                    <label for="job7">Student Level</label>
                  </div>
                  <div class={styles["type-container"]}>
                    <input
                      type="checkbox"
                      id="job8"
                      class={styles["job-style"]}
                    />
                    <label for="job8">Entry Level</label>
                  </div>
                </div>
              </div>
            </div>
            <div class={styles["searched-jobs"]}>
              <div class={styles["searched-bar"]}>
                <div class={styles["searched-show"]}>
                  Showing 1 - {currentJobs.length} of {jobs.length} Jobs
                </div>
                <div class={styles["searched-sort"]}>
                  Sort by:{" "}
                  <span class={styles["post-time"]}>
                    {" "}
                    <select
                      id="location-filter"
                      className={`${styles.location} ${styles.selectlist}`}
                    >
                      <option selected="selected" value="">
                        Full Time
                      </option>
                      <option value="parttime">Part Time</option>
                    </select>
                  </span>
                </div>
              </div>
              {/* //yaha map karna hai data loop karna hai */}

              <div class={styles["job-cards"]}>
                {currentJobs
                  .slice(-1 * 6)
                  //sort data based on latest timestamp
                  .sort((a, b) => {
                    return new Date(b.timestamp) - new Date(a.timestamp);
                  })
                  .filter(
                    (item) =>
                      item.title.toLowerCase().includes(search) ||
                      item.companyName.toLowerCase().includes(search)
                  )

                  .map((job) => {
                    if (imageFailures.includes(job.companyName)) {
                      return (
                        <div class={styles["job-card"]}>
                          <div class={styles["job-card-header"]}>
                            <div
                              class={styles["job-card-logo"]}
                              style={{
                                width: "116px",
                                height: "83px",
                                padding: "10px",
                                fontWeight: "bold",
                                fontSize: "20px",
                              }}
                            >
                              {job.companyName}
                            </div>

                            <div class={styles["menu-dot"]}></div>
                          </div>
                          <div class={styles["job-card-title"]}>
                            {job.title}
                          </div>
                          <div class={styles["job-card-subtitle"]}>
                            {job.subTitle}
                          </div>
                          <div class={styles["job-detail-buttons"]}>
                            <button
                              class={`${styles["search-buttons"]} ${styles["detail-button"]}`}
                            >
                              {job.role}
                            </button>
                            <button
                              class={`${styles["search-buttons"]} ${styles["detail-button"]}`}
                            >
                              {job.experience}
                            </button>
                            <button
                              class={`${styles["search-buttons"]} ${styles["detail-button"]}`}
                            >
                              {job.level}
                            </button>
                          </div>
                          <div class={styles["job-card-buttons"]}>
                            <button
                              onClick={addDetailPage}
                              id={job._id}
                              class={`${styles["search-buttons"]} ${styles["card-buttons"]}`}
                            >
                              Apply Now
                            </button>
                            <button
                              class={`${styles["search-buttons"]} ${styles["card-buttons-msg"]}`}
                            >
                              <Link
                                to="/company-review/comment"
                                style={{
                                  textDecoration: "none",
                                  color: "#111111",
                                }}
                              >
                                Message
                              </Link>
                            </button>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div class={styles["job-card"]}>
                        <div class={styles["job-card-header"]}>
                          <img
                            src={job.logo}
                            alt="logo"
                            onError={() => handleError(job.companyName)}
                          />
                          <div class={styles["menu-dot"]}></div>
                        </div>
                        <div class={styles["job-card-title"]}>{job.title}</div>
                        <div
                          class={styles["job-card-subtitle"]}
                          style={{
                            //truncate text
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",

                            lineHeight: "20px",
                            fontWeight: "400",
                          }}
                        >
                          {job.subTitle}
                        </div>
                        <div class={styles["job-detail-buttons"]}>
                          <button
                            class={`${styles["search-buttons"]} ${styles["detail-button"]}`}
                          >
                            {job.role}
                          </button>
                          <button
                            class={`${styles["search-buttons"]} ${styles["detail-button"]}`}
                          >
                            {job.experience}
                          </button>
                          <button
                            class={`${styles["search-buttons"]} ${styles["detail-button"]}`}
                          >
                            {job.level}
                          </button>
                          {/* <button
                            class={`${styles["search-buttons"]} ${styles["fav-button"]}`}
                            style={{
                              marginLeft: "10px",

                              border: "none",
                            }}
                            id={job._id}
                            onClick={addFav}
                          >
                            <i class="fas fa-heart"></i>
                          </button> */}
                        </div>
                        <div class={styles["job-card-buttons"]}>
                          <button
                            onClick={addDetailPage}
                            id={job._id}
                            class={`${styles["search-buttons"]} ${styles["card-buttons"]}`}
                          >
                            Apply Now
                          </button>
                          <button
                            class={`${styles["search-buttons"]} ${styles["card-buttons-msg"]}`}
                          >
                            <Link
                              to="/company-review/comment"
                              style={{
                                textDecoration: "none",
                                color: "#111111",
                              }}
                            >
                              Message
                            </Link>
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div class={styles["job-overview"]}>
                <div class={styles["job-overview-cards"]}>
                  {currentJobs.map((job) => {
                    return (
                      <div class={styles["job-overview-card"]}>
                        <div
                          class={`${styles["job-card"]} ${styles["overview-card"]}`}
                        >
                          <div class={styles["overview-wrapper"]}>
                            <img src={job.logo} alt="logo" />
                            <div class={styles["overview-detail"]}>
                              <div class={styles["job-card-title"]}>
                                {job.title}
                              </div>
                              <div class={styles["job-card-subtitle"]}>
                                {job.location}
                              </div>
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class={`${styles.feather} ${styles["feather-heart"]} ${styles.heart}`}
                            >
                              <path d="M20.8 4.6a5.5 5.5 0 00-7.7 0l-1.1 1-1-1a5.5 5.5 0 00-7.8 7.8l1 1 7.8 7.8 7.8-7.7 1-1.1a5.5 5.5 0 000-7.8z" />
                            </svg>
                          </div>
                          <div class={styles["job-overview-buttons"]}>
                            <div
                              class={`${styles["search-buttons"]} ${styles["time-button"]}`}
                            >
                              {job.role}
                            </div>
                            <div
                              class={`${styles["search-buttons"]} ${styles["level-button"]}`}
                            >
                              {job.level}
                            </div>
                            <div class={styles["job-stat"]}>{job.jobStat}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div class={styles["job-explain"]}>
                  <img class={styles["job-bg"]} alt="" />
                  <div class={styles["job-logos"]}>
                    {currentJobs.map((job) => {
                      if (job._id === Id) {
                        return <img src={job.logo} alt="" />;
                      }
                    })}
                  </div>
                  {/* //yaha map karna hai */}
                  {currentJobs.map((job) => {
                    if (job._id === Id) {
                      // alert(Id + " " + job._id);
                      return (
                        <div class={styles["job-explain-content"]}>
                          <div class={styles["job-title-wrapper"]}>
                            <div class={styles["job-card-title"]}>
                              {job.title}
                            </div>
                            <div class={styles["job-action"]}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class={`${styles.feather} ${styles["feather-heart"]} ${styles.heart}`}
                              >
                                <path d="M20.8 4.6a5.5 5.5 0 00-7.7 0l-1.1 1-1-1a5.5 5.5 0 00-7.8 7.8l1 1 7.8 7.8 7.8-7.7 1-1.1a5.5 5.5 0 000-7.8z" />
                              </svg>

                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class={`${styles.feather} ${styles["feather-share-2"]}`}
                              >
                                <circle cx="18" cy="5" r="3" />
                                <circle cx="6" cy="12" r="3" />
                                <circle cx="18" cy="19" r="3" />
                                <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
                              </svg>
                            </div>
                          </div>
                          <div class={styles["job-subtitle-wrapper"]}>
                            <div class={styles["company-name"]}>
                              {job.companyName}
                              <span class={styles["comp-location"]}>
                                {job.location}
                              </span>
                            </div>
                          </div>
                          <div class={styles["explain-bar"]}>
                            <div class={styles["explain-contents"]}>
                              <div class={styles["explain-title"]}>
                                Experience
                              </div>
                              <div class={styles["explain-subtitle"]}>
                                {job.experience}
                              </div>
                            </div>
                            <div class={styles["explain-contents"]}>
                              <div class={styles["explain-title"]}>
                                Work Level
                              </div>
                              <div class={styles["explain-subtitle"]}>
                                {job.level}
                              </div>
                            </div>
                            <div class={styles["explain-contents"]}>
                              <div class={styles["explain-title"]}>Role</div>
                              <div class={styles["explain-subtitle"]}>
                                {job.role}
                              </div>
                            </div>
                            <div class={styles["explain-contents"]}>
                              <div class={styles["explain-title"]}>
                                Offer Salary
                              </div>
                              <div class={styles["explain-subtitle"]}>
                                ₹ {job.salary} / year
                              </div>
                            </div>
                          </div>
                          <div class={styles["overview-text"]}>
                            <div class={styles["overview-text-header"]}>
                              Overview
                            </div>
                            <div class={styles["overview-text-subheader"]}>
                              {job.overview}
                            </div>
                          </div>
                          <div class={styles["overview-text"]}>
                            <div class={styles["overview-text-header"]}>
                              Job Description
                            </div>

                            {job.jobDesc.map((desc, index) => (
                              <div class={styles["overview-text-item"]}>
                                {desc.description}
                              </div>
                            ))}

                            {isModalResume && (
                              <Modal closing={closeModalResume}>
                                <>
                                  <h4
                                    style={{
                                      fontSize: "18px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    TechSmart Resume Analyzer
                                  </h4>
                                  <p
                                    style={{
                                      fontSize: "14px",
                                      color: "gray",
                                    }}
                                  >
                                    Upload your resume and we will analyze it
                                    using our Some technology to see if you are
                                    a good fit for this job.
                                  </p>
                                  <div class="d-flex justify-content-between">
                                    <button
                                      type="button"
                                      class="btn btn-primary m-3"
                                    >
                                      <Link
                                        style={{
                                          color: "white",
                                          textDecoration: "none",
                                        }}
                                        to={
                                          "/alljobs/" +
                                          job._id +
                                          "/resume-analyzer"
                                        }
                                      >
                                        Analyze Resume
                                      </Link>
                                    </button>
                                    <button
                                      onClick={() => {
                                        window.location.href = job.applyUrl;
                                      }}
                                      type="button"
                                      class="btn btn-secondary m-3"
                                    >
                                      Apply Without Analyze
                                    </button>
                                  </div>
                                </>
                              </Modal>
                            )}
                            <button
                              onClick={openModalResume}
                              class={`${styles["search-buttons"]} ${styles["card-buttons"]}`}
                            >
                              Apply Now
                            </button>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* //pagination */}
          <div className={styles.pagination}>
            <ul className={styles.pageNumbers}>
              <li>
                <button
                  onClick={firstPage}
                  disabled={currentPage === pageNumbers[0] ? true : false}
                >
                  <i class="fas fa-angle-double-left"></i>
                </button>
              </li>
              <li>
                <button
                  onClick={prevPage}
                  disabled={currentPage === pageNumbers[0] ? true : false}
                >
                  <i class="fas fa-angle-left"></i>
                </button>
              </li>
              {renderPageNumbers}
              <li>
                <button
                  onClick={nextPage}
                  disabled={
                    currentPage === pageNumbers[pageNumbers.length - 1]
                      ? true
                      : false
                  }
                >
                  <i class="fas fa-angle-right"></i>
                </button>
              </li>
              <li>
                <button
                  onClick={lastPage}
                  disabled={
                    currentPage === pageNumbers[pageNumbers.length - 1]
                      ? true
                      : false
                  }
                >
                  <i class="fas fa-angle-double-right"></i>
                </button>
              </li>
            </ul>
          </div>

          <div className={styles.lpagignate}>
            <span
              className={`${styles.jPaginateBack} ${styles.pagearrow}`}
            ></span>
            <ul className={styles.pagination}></ul>
            <span
              className={`${styles.jPaginateNext} ${styles.pagearrow}`}
            ></span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Testing;
