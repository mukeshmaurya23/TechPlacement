import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import styles from "./AddJob.module.css";
import { CREATE_JOBS } from "../constant";
const AddJob = () => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [level, setLevel] = useState("");
  const [location, setLocation] = useState("");
  const [jobStat, setJobStat] = useState("");

  const [companyName, setCompanyName] = useState("");

  const [salary, setSalary] = useState("");
  const [overview, setOverview] = useState("");
  const [logo, setLogo] = useState("");

  const [applyUrl, setApplyUrl] = useState("");

  //merge job and jobDesc

  //console.log(job);
  //.........................
  const [addJobDec, setAddJobDec] = useState([]);
  const [jobDesc, setJobDesc] = useState([]);

  const handleAddJobDesc = (e) => {
    e.preventDefault();
    //count of problem statement
    const count = addJobDec.length;
    // adding problem statement
    jobDesc.push({
      description: "",
    });
    console.log("setpf", count, jobDesc);
    setAddJobDec([
      ...addJobDec,

      <>
        <div className="p-3">
          <div class="form-group">
            <label>Description</label>
            <input
              type="text"
              class="form-control"
              rows="3"
              placeholder="Enter description for job"
              name={`description${count}`}
              onChange={(e) => {
                setJobDesc((prevState) => {
                  var val = e.target.value;
                  jobDesc[count].description = val;
                  return jobDesc;
                });
              }}
            />
          </div>
        </div>
      </>,
    ]);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleApplyUrl = (e) => {
    setApplyUrl(e.target.value);
  };

  const handleSubTitle = (e) => {
    setSubTitle(e.target.value);
  };
  const handleRole = (e) => {
    setRole(e.target.value);
  };
  const handleExperience = (e) => {
    setExperience(e.target.value);
  };
  const handleLevel = (e) => {
    setLevel(e.target.value);
  };
  const handleLocation = (e) => {
    setLocation(e.target.value);
  };
  const handleJobStat = (e) => {
    setJobStat(e.target.value);
  };

  const handleCompanyName = (e) => {
    setCompanyName(e.target.value);
  };

  const handleSalary = (e) => {
    setSalary(e.target.value);
  };
  const handleOverview = (e) => {
    setOverview(e.target.value);
  };
  const handleLogo = (e) => {
    setLogo(e.target.files[0]);
  };
  // const handleJobDesc = (e) => {
  //   setJobDesc(e.target.value);
  // };

  // const handleChnage = (e) => {
  //   setJob({
  //     ...job,
  //     [e.target.name]: e.target.files ? e.target.files[0] : e.target.value,
  //   });
  // };

  // const handleFileChnage = (e) => {
  //   setJob({ ...job, logo: e.target.files[0] });
  // };

  // useEffect(() => {
  //   console.log("job", job);
  //   setJob({ ...job, jobDesc: jobDesc });
  // }, [jobDesc]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("subTitle", subTitle);
    data.append("role", role);
    data.append("experience", experience);
    data.append("level", level);
    data.append("location", location);
    data.append("jobStat", jobStat);

    data.append("companyName", companyName);

    data.append("salary", salary);
    data.append("overview", overview);
    data.append("logo", logo);
    data.append("applyUrl", applyUrl);
    //  data.append("jobDesc", jobDesc);
    data.append("jobDesc", JSON.stringify(jobDesc));
    console.log("data", data);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post(CREATE_JOBS, data, config)

      .then((res) => {
        toast.success("Job added successfully");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //create a form to add a job

  return (
    <div class="container-fluid">
      <div class={`${styles.addjobMakingResponsive} row`}>
        <div class="col-md-12 col-lg-12 col-xl-12 col-12">
          <form class="rounded-1 p-4 border bg-white" onSubmit={handleSubmit}>
            <label class="d-block mb-4">
              <span class="form-label d-block">
                Title<span class="text-danger">*</span>
              </span>
              <input
                name="title"
                type="text"
                onChange={handleTitle}
                class="form-control"
                placeholder="Enter the title of the job"
              />
            </label>

            <label class="d-block mb-4">
              <span class="form-label d-block">
                SubTitle<span class="text-danger">*</span>
              </span>
              <input
                name="subTitle"
                type="text"
                class="form-control"
                onChange={handleSubTitle}
                placeholder=" Enter the subtitle of the job"
              />
            </label>

            <label class="d-block mb-4">
              <span class="form-label d-block">
                Role<span class="text-danger">*</span>
              </span>
              <input
                name="role"
                type="text"
                onChange={handleRole}
                class="form-control"
                placeholder=""
              />
            </label>

            <label class="d-block mb-4">
              <span class="form-label d-block">
                Apply URL<span class="text-danger">*</span>
              </span>
              <input
                name="applyUrl"
                type="text"
                onChange={handleApplyUrl}
                class="form-control"
                placeholder=""
              />
            </label>

            <label class="d-block mb-4">
              <span class="form-label d-block">
                Experience<span class="text-danger">*</span>
              </span>
              <input
                name="experience"
                type="text"
                onChange={handleExperience}
                class="form-control"
                placeholder=""
              />
            </label>

            <label class="d-block mb-4">
              <span class="form-label d-block">
                Level<span class="text-danger">*</span>
              </span>
              <input
                name="level"
                type="text"
                onChange={handleLevel}
                class="form-control"
                placeholder=""
              />
            </label>

            <label class="d-block mb-4">
              <span class="form-label d-block">
                Location<span class="text-danger">*</span>
              </span>
              <input
                name="location"
                type="text"
                onChange={handleLocation}
                class="form-control"
                placeholder=""
              />
            </label>

            <label class="d-block mb-4">
              <span class="form-label d-block">
                Job Status<span class="text-danger">*</span>
              </span>
              <input
                name="jobStat"
                type="text"
                onChange={handleJobStat}
                class="form-control"
                placeholder=""
              />
            </label>

            <label class="d-block mb-4">
              <span class="form-label d-block">
                Company Name<span class="text-danger">*</span>
              </span>
              <input
                name="companyName"
                type="text"
                onChange={handleCompanyName}
                class="form-control"
                placeholder=""
              />
            </label>
            <label class="d-block mb-4">
              <span class="form-label d-block">
                Overview<span class="text-danger">*</span>
              </span>
              <input
                name="overview"
                type="text"
                onChange={handleOverview}
                class="form-control"
                placeholder=""
              />
            </label>

            <label class="d-block mb-4">
              <span class="form-label d-block">
                Salary<span class="text-danger">*</span>
              </span>
              <input
                name="salary"
                type="text"
                onChange={handleSalary}
                class="form-control"
                placeholder=""
              />
            </label>

            <label class="d-block mb-4">
              <span class="form-label d-block">
                Logo <span class="text-danger">*</span>
              </span>
              <input
                name="logo"
                type="file"
                onChange={handleLogo}
                //pass logo as string not ob
                class="form-control"
                placeholder=""
              />
            </label>

            <div class="form-group p-1">
              <button onClick={handleAddJobDesc} className="btn btn-main mt-2">
                <i className="fab fa-plus"></i>Add Job Description
              </button>
              {addJobDec}
              {/* <input type="text" onChange={handleJobDesc} /> */}
            </div>
            <div class="mb-3">
              <button type="submit" class="btn btn-primary px-3 rounded-3">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJob;
