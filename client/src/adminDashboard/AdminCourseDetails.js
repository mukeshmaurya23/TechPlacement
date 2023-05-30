import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../UI/Spinner";
import AddCourse from "./AddCourse";
import Modal from "../UI/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import { DELETE_COURSE } from "../constant";
import { GET_COURSE } from "../constant";
const AdminCourseDetails = () => {
  const [foundCourse, setFoundCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isModal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const modalHandler = () => {
    setModal(false);
  };

  const deleteHandler = async (id) => {
    try {
      const url = `${DELETE_COURSE}/${id}`;
      const response = await axios.delete(url);

      toast.success("Deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const response = await axios.get(GET_COURSE);
        setFoundCourse(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Something went wrong");
      }
    };
    fetchCourse();
  }, []);

  return (
    <>
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
                      placeholder="Search courses"
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
                  <b>Course Details</b>
                </h2>
              </div>
              <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
                <button className="btn btn-primary" onClick={openModal}>
                  + Add New Course
                </button>
                {isModal && (
                  <Modal closing={modalHandler} title="Add Course">
                    <AddCourse setModal={setModal} />
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
                      <th>Course Id</th>
                      <th>Course Title</th>
                    </tr>
                  </thead>
                  <tbody>
                    {foundCourse && foundCourse.length > 0 ? (
                      foundCourse
                        .filter((val) => {
                          if (search === "") {
                            return val;
                          } else if (
                            val.title
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          ) {
                            return val;
                          }
                        })
                        .map((course, index) => {
                          return (
                            <tr key={course._id}>
                              <td>{index + 1}</td>
                              <td>{course._id}</td>
                              <td>{course.title}</td>
                              <td>
                                <Link
                                  to={`/admin/data/updateCourse/${course._id}`}
                                >
                                  <button className="btn btn-primary">
                                    Edit
                                  </button>
                                </Link>
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => deleteHandler(course._id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No Course Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCourseDetails;
