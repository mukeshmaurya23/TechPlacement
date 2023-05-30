import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { POST_TESTIMONIAL } from "../constant";
const AddTestimonial = () => {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name,
      designation,
      description,
    };
    axios
      .post(POST_TESTIMONIAL, data)
      .then((res) => {
        console.log(res.data);
        toast.success("Testimonial Submitted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container ">
        <div className="row">
          <div className="col">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="designation">Designation</label>
                <input
                  type="text"
                  className="form-control"
                  id="designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  marginTop: "1rem",
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTestimonial;
