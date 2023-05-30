import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import ShimmerResume from "./ShimmerResume";
import { ANALYZE_RESUME } from "../../constant";
const ResumeAnalyzer = () => {
  const [courses, setCourses] = useState([]);
  const [resume, setResume] = useState(null);
  const [loading, SetLoading] = useState(false);
  const [error, setError] = useState(null);

  //types pdf and docx
  const types = ["application/pdf", "application/msword"];
  console.log(resume);
  console.log(courses);
  const changeHandler = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setResume(selected);
      setError("");
    } else {
      setResume(null);
      setError("Please select a valid file type");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    SetLoading(true);

    let formData = new FormData();
    formData.append("resume", resume);
    axios
      .post(ANALYZE_RESUME, formData)
      .then((res) => {
        setCourses(res.data);
        SetLoading(false);
        console.log(res.data.fileId);
      })

      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      })

      .then(toast.success("Resume Uploaded Successfully"))

      .catch((err) => console.log(err));
  };

  return (
    <>
      <div
        class="container-fluid p-2"
        style={{
          marginTop: "6rem",
        }}
      >
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <div class="card p-3">
              <div class="card-body">
                <h2 class="text-center mb-3">Smart Resume Analysis</h2>
                <form
                  onSubmit={submitHandler}
                  style={{
                    backgroundColor: "#f5f5f5",
                    borderRadius: "5px",
                    padding: "20px",
                    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <label
                    for="fileInput"
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      marginLeft: "16px",
                    }}
                  >
                    Upload Resume
                  </label>
                  <div
                    class="form-group m-3"
                    style={{
                      border: "2px dotted #ccc",
                      borderRadius: "5px",
                      padding: "20px",
                      textAlign: "center",
                    }}
                  >
                    <div class="custom-file d-flex ">
                      <input
                        onChange={changeHandler}
                        type="file"
                        class="custom-file-input"
                        id="fileInput"
                        accept=".pdf,.doc,.docx"
                        style={{
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    class="btn btn-primary btn-block"
                    disabled={!resume}
                    style={{
                      backgroundColor: "#1a73e8",
                      border: "none",
                      borderRadius: "5px",
                      marginLeft: "16px",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    Submit
                  </button>
                </form>
                {error && <div className="error">{error}</div>}
              </div>
            </div>
          </div>
        </div>
        {loading && <ShimmerResume />}
        <div class="row mt-5">
          <div class="col-md-8 offset-md-2">
            <div class="card">
              <div class="card-body">
                <h2 class="text-center mb-3">Resume Analysis</h2>
                <div class="progress mb-3">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    //multiply the rating by 10 to get the percentage
                    // style={{ width: `${course.rating * 10}%` }}
                    style={{
                      width: `${courses.length * 10}%`,
                    }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {courses.length * 10}%
                  </div>
                </div>
                <table class="table">
                  <thead>
                    <tr>
                      <th>Eligble</th>
                      <th>Yes/No</th>
                      <th>Points Required</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      {courses.length <= 5 ? (
                        <>
                          <td>
                            <i
                              class="fa fa-check-circle"
                              style={{
                                color: "green",
                                fontSize: "20px",
                                fontWeight: "500",
                              }}
                            ></i>
                          </td>

                          <td>Yes</td>
                          <td>{courses.length * 10}</td>
                        </>
                      ) : (
                        <>
                          <td>
                            <i
                              class="fa fa-times-circle"
                              style={{
                                color: "red",
                                fontSize: "20px",
                                fontWeight: "500",
                              }}
                            ></i>
                          </td>

                          <td>No</td>
                          <td>{courses.length * 10}</td>
                        </>
                      )}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card p-2 m-4">
        <div class="card-body d-flex flex-column align-items-center p-2">
          <h4
            class="card-title text-center"
            style={{
              fontSize: "20px",
              fontWeight: "700",
            }}
          >
            TechPlacement Course Suggestion
          </h4>
          <p
            class="card-text text-center"
            style={{
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            Based on your resume analysis, we have suggested the following
            courses for you to take. Click on the course to get started. Good
            luck!
          </p>
          <div class=" justify-content-center p-2 m-3">
            {courses.map((course) => (
              <>
                <Link to={`/courses/${course.id}`} class="btn btn-primary m-3">
                  <i class="fas fa-link mr-2"></i> {course.title}
                </Link>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
//bootstrap text color: black class="text-dark"
export default ResumeAnalyzer;
