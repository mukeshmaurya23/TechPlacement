import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { GET_JOBS } from "../../constant";
const Details = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(GET_JOBS);
        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Something went wrong");
      }
    };
    fetchJobs();
  }, []);
  return (
    <>
      {jobs
        .filter(
          (item) =>
            item.tag === "MNC" ||
            item.tag === "Product based" ||
            item.tag === "Startup"
        )
        .map((item) => {
          return (
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text">{item.tag}</p>
                  <p className="card-text">{item.location}</p>
                  <p className="card-text">{item.salary}</p>
                  <p className="card-text">{item.experience}</p>

                  <img src={item.image} alt="" />
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Details;
