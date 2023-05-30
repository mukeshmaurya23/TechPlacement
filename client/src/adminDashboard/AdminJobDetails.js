import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "../UI/Modal";
import Spinner from "../UI/Spinner";
import { toast } from "react-toastify";
import AddJob from "./AddJob";
import { GET_JOBS, DELETE_JOBS } from "../constant";
const AdminJobsDetails = () => {
  const [foundJob, setFoundJob] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isModal, setModal] = useState(false);
  const [isModal1, setModal1] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const modalHandler = () => {
    setModal(false);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(GET_JOBS);
        setFoundJob(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Something went wrong");
      }
    };
    fetchJobs();
  }, []);

  //delete data

  //access the id of the company and delete it
  const deleteHandler = async (id) => {
    try {
      const url = `${DELETE_JOBS}/${id}`;
      const response = await axios.delete(url);
      console.log(response);
      toast.success("Deleted successfully");
      setModal1(false);
      const updatedData = foundJob.filter((item) => item._id !== id);
      setFoundJob(updatedData);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div style={{ marginTop: "9rem" }}>
      <div class="container ">
        {loading && <Spinner />}
        <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
          <div class="row ">
            <div class="col-sm-3 mt-5 mb-4 text-gred">
              <div className="search">
                <form class="form-inline">
                  <input
                    class="form-control mr-sm-2"
                    type="search"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search jobs"
                    aria-label="Search"
                  />
                </form>
              </div>
            </div>

            <div
              class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
              style={{ color: "green" }}
            >
              <h2>
                <b>Jobs Details</b>
              </h2>
            </div>
            <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
              <button className="btn btn-primary" onClick={openModal}>
                + Add New Jobs
              </button>
              {isModal && (
                <Modal closing={modalHandler} title="Add Jobs">
                  <AddJob
                    setModal={setModal}
                    setFoundJob={setFoundJob}
                    foundJob={foundJob}
                  />
                </Modal>
              )}
            </div>
          </div>
          <div class="row">
            <div class="table-responsive d-inline-block  ">
              <table class="table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th>Sr no</th>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Role</th>
                    <th>Company</th>
                  </tr>
                </thead>
                <tbody>
                  {foundJob
                    .filter((item) =>
                      item.title?.toLowerCase().includes(search?.toLowerCase())
                    )
                    .map((user, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user._id}</td>
                        <td>{user.title}</td>
                        <td>{user.role}</td>
                        <td>{user.companyName}</td>

                        <td>
                          <Link
                            to="/admin/data/add-jobs"
                            class="delete p-4"
                            title="Delete"
                            //open modal for delete and pass the id of the company and delete it
                            onClick={() => {
                              deleteHandler(user._id);
                            }}
                          >
                            {/* {isModal1 && (
                              <Modal
                                closing={modalHandler1}
                                title="Delete Company"
                              >
                                <p>
                                  Are you sure you want to delete this company?
                                </p>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => deleteHandler(user._id)}
                                >
                                  Delete
                                </button>
                              </Modal>
                            )} */}

                            <i
                              class="fa fa-trash btn btn-danger"
                              aria-hidden="true"
                            ></i>
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminJobsDetails;
