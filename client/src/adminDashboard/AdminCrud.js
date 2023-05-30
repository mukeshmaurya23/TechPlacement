import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../UI/Modal";
import Spinner from "../UI/Spinner";
import { toast } from "react-toastify";
import AddCompany from "./AddCompany";

import { HOME_DATA, DELETE_DATA } from "../constant";
const AdminCrud = () => {
  const [foundUser, setFoundUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isModal, setModal] = useState(false);
  const [isModal1, setModal1] = useState(false);

  const navigate = useNavigate();
  const openModal = () => {
    setModal(true);
  };

  const modalHandler = () => {
    setModal(false);
  };
  const openModal1 = () => {
    setModal1(true);
  };
  const modalHandler1 = () => {
    setModal1(false);
  };

  useEffect(() => {
    const fetchComapny = async () => {
      setLoading(true);
      try {
        const response = await axios.get(HOME_DATA);
        setFoundUser(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Something went wrong");
      }
    };
    fetchComapny();
  }, []);

  const addPost = (posts) => {
    setFoundUser([...foundUser, posts]);
  };

  //delete data

  //access the id of the company and delete it
  const deleteHandler = async (id) => {
    try {
      const url = `${DELETE_DATA}/${id}`;
      const response = await axios.delete(url);
      console.log(response);
      toast.success("Deleted successfully");
      setModal1(false);
      const updatedData = foundUser.filter((item) => item._id !== id);
      setFoundUser(updatedData);
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
                    placeholder="Search Company"
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
                <b>Company Details</b>
              </h2>
            </div>
            <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
              <button className="btn btn-primary" onClick={openModal}>
                + Add New Company
              </button>
              {isModal && (
                <Modal closing={modalHandler} title="Add Company">
                  <AddCompany addPost={addPost} setModal={setModal} />
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
                    <th>ID </th>
                    <th>Title</th>

                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {foundUser
                    .filter((item) =>
                      item.title?.toLowerCase().includes(search?.toLowerCase())
                    )
                    .map((user, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.id}</td>
                        <td>{user.title}</td>

                        <td>
                          <Link
                            to={`/admin/data/update/${user.id}`}
                            class="edit p-4"
                            title="Edit"
                          >
                            <i
                              class="fa fa-pencil-square-o btn btn-primary"
                              aria-hidden="true"
                            ></i>
                          </Link>
                          <Link
                            to="/admin/data/add-company"
                            class="delete p-4"
                            title="Delete"
                            //open modal for delete and pass the id of the company and delete it
                            onClick={() => {
                              openModal1();
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

export default AdminCrud;
