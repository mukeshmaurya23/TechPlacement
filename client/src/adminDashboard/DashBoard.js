import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "../UI/Modal";
import { toast } from "react-toastify";
import {
  POST_NEWS_TICKER,
  HOME_DATA,
  GET_JOBS,
  GET_COURSE,
  SET_ROLE,
  GET_ALL_USER,
  DELETE_USER,
} from "../constant";
const DashBoard = () => {
  const [foundUser, setFoundUser] = useState([]);
  const [role, setRole] = useState("");
  const [getId, setId] = useState("");
  const [foundCompany, setFoundCompany] = useState([]);
  const [foundJob, setFoundJob] = useState([]);
  const [foundCourse, setFoundCourse] = useState([]);
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const handleLastesUpdate = (e) => {
    e.preventDefault();
    axios
      .post(POST_NEWS_TICKER, { title, link })
      .then((res) => {
        console.log(res.data);
        toast.success("Latest Update Added");
        setModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
    setTitle("");
    setLink("");
  };

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(HOME_DATA);
        setFoundCompany(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompany();
  }, []);
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(GET_JOBS);
        setFoundJob(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJob();
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(GET_COURSE);
        setFoundCourse(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourse();
  }, []);

  const handleRole = async (e) => {
    try {
      const url = `${SET_ROLE}/${getId}`;
      const response = axios.put(url, { role });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fethUser = async () => {
      try {
        const response = await axios.get(GET_ALL_USER);
        setFoundUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fethUser();
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    setId(e.target.id);

    try {
      const url = `${DELETE_USER}/${getId}`;
      const response = await axios.delete(url);
      toast.success("User Deleted Successfully");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      class="container-fluid"
      id="main"
      style={{
        marginLeft: "1rem",
      }}
    >
      <div class="row row-offcanvas row-offcanvas-left">
        <div
          class="col-md-3 col-lg-2 sidebar-offcanvas"
          id="sidebar"
          role="navigation"
          style={{
            border: "1px solid #ccc",
          }}
        >
          <ul class="nav flex-column pl-1 p-2">
            <li class="nav-item text-bg-secondary p-3">Overview</li>
            <li class="nav-item p-3">
              <Link to="/admin/data" class="list-group-item  main-color-bg ">
                Dashboard
              </Link>
            </li>
            <li class="nav-item p-3">
              <Link to="/admin/data/add-jobs" class="list-group-item ">
                Add Jobs
              </Link>
            </li>
            <li class="nav-item p-3">
              <Link to="/admin/data/add-company" class="list-group-item">
                Add Company
              </Link>
            </li>

            <li class="nav-item p-3">
              <Link to="/admin/data/add-course" class="list-group-item">
                Add Courses
              </Link>
            </li>
            <li class="nav-item p-3">
              <Link
                to="/admin/data"
                class="list-group-item"
                onClick={openModal}
              >
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#GFG"
                  style={{
                    background: "transparent",
                    border: "none",
                    outline: "none",
                  }}
                >
                  Latest Updates !!
                </button>
              </Link>
            </li>
          </ul>
        </div>

        <div class="modal fade" id="GFG">
          <div
            class="modal-dialog modal-lg
						modal-dialog-scrollable "
          >
            <div class="modal-content p-4">
              <div class="modal-header">
                <h5 class="modal-title" id="GFGLabel">
                  Add Latest Updates !!
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form onSubmit={handleLastesUpdate}>
                  <div class="form-group">
                    <label for="title">Title</label>
                    <input
                      type="text"
                      class="form-control"
                      id="title"
                      value={title}
                      required
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter Title"
                    />
                  </div>
                  <div class="form-group">
                    <label for="description">Link </label>
                    <input
                      type="text"
                      class="form-control"
                      id="link"
                      required
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      placeholder="Enter Link"
                    />
                  </div>
                  <button type="submit" class="btn btn-primary mt-4">
                    Submit
                  </button>
                </form>
              </div>

              <br />
              <br />
            </div>
          </div>
        </div>
        <div class="col-md-9 col-lg-9 main">
          <h1 class="text-bold m-3">Admin Dashboard</h1>

          <div class="row mb-3 text-center mt-2">
            <div class="col-xl-3 col-lg-6">
              <div class="card card-inverse card-success">
                <div class="card-block bg-success">
                  <div class="rotate mt-2">
                    <i class="fa fa-user fa-3x"></i>
                  </div>
                  <h6 class="text-uppercase">Users</h6>
                  <h1 class="display-1">{foundUser.length}</h1>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-6">
              <div class="card card-inverse card-danger">
                <div class="card-block bg-danger">
                  <Link
                    to="/admin/data/add-company"
                    class="list-group-item text-dark"
                  >
                    <div class="rotate mt-2">
                      <i class="fa fa-list fa-3x"></i>
                    </div>

                    <h6 class="text-uppercase">Companies</h6>
                    <h1 class="display-1">{foundCompany.length}</h1>
                  </Link>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-6">
              <div class="card card-inverse card-info">
                <div class="card-block bg-info">
                  <Link
                    to="/admin/data/add-jobs"
                    class="list-group-item text-dark"
                  >
                    <div class="rotate mt-2">
                      <i class="fa fa-building-o fa-3x"></i>
                    </div>
                    <h6 class="text-uppercase">Jobs</h6>
                    <h1 class="display-1">{foundJob.length}</h1>
                  </Link>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-6">
              <div class="card card-inverse card-warning">
                <div class="card-block bg-warning">
                  <Link
                    to="/admin/data/add-course"
                    class="list-group-item text-dark"
                  >
                    <div class="rotate mt-2">
                      <i class="fa fa-share fa-3x"></i>
                    </div>
                    <h6 class="text-uppercase">Course</h6>
                    <h1 class="display-1">{foundCourse.length}</h1>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <hr />

          <hr />

          <form onSubmit={handleRole}>
            <div class="table-responsive-lg">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Index</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Delete</th>
                    <th>Edit</th>
                    <th>Give Role</th>
                  </tr>
                </thead>
                <tbody>
                  {foundUser.map((user, index) => {
                    return (
                      <tr>
                        <td scope="row">{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <button
                            class="btn btn-danger"
                            id={user._id}
                            onClick={handleDelete}
                          >
                            Delete
                          </button>
                        </td>
                        <td>
                          <button class="btn btn-success">Edit</button>
                        </td>
                        <td>
                          <select
                            class="form-control"
                            onChange={(e) => {
                              // alert(e.target.value);
                              setId(user._id);
                              setRole(e.target.value);
                            }}
                          >
                            <option disabled selected>
                              Select Role
                            </option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                            <option value="recruiter">Recruiter</option>
                          </select>
                        </td>
                        <td>
                          <button class="btn btn-primary">Submit</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
