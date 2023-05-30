import React from "react";
import { Link, useParams } from "react-router-dom";
const DummyPage = () => {
  const { id } = useParams(); // Get the dynamic parameter from the URL
  const getJobListings = (id) => {
    //take dummy data
    const jobListings = [
      {
        id: 1,
        title: "Software Engineer",
        company: "Google",
        location: "Mountain View, CA",
        type: "Full Time",
      },
      {
        id: 2,
        title: "Software Engineer",
        company: "Facebook",
        location: "Menlo Park, CA",
        type: "Full Time",
      },
    ];
    return jobListings.find((jobListing) => jobListing.id === id);
  };

  const jobListings = getJobListings(id);

  return <></>;
};

export default DummyPage;
