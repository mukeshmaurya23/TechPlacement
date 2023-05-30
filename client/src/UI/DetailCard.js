import React from "react";
import { LOCALHOST } from "../constant";
// import dataimage from "../components/Data/dataimage";

const DetailCard = (props) => {
  const navigateHndlerToCarrerPage = () => {
    window.location.href = props.carrerLink;
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-3 col-md-6">
          <div className="rounded text-center p-2 mt-5">
            {/* {dataimage.map((item) => {
              if (item.id === params.id) {
                return (
                  <img
                    key={item.id}
                    src={item.image}
                    alt="logo"
                    className="img-fluid"
                    style={{ height: "50%", width: "50%" }}
                  />
                );
              }
              return null;
            })} */}
            <img
              src={LOCALHOST + "/" + props.image}
              alt="logo"
              className="img-fluid"
              style={{ height: "50%", width: "50%" }}
            />
          </div>
        </div>
      </div>
      <h2 className="text-center mt-0 ">{props.title}</h2>
      <p className="lead p-3 fs-5">{props.description}</p>
      <div className="pt-3">
        <span className="p-2 h3">Visit Carrer Page</span>
        <button
          className="btn btn-primary"
          onClick={navigateHndlerToCarrerPage}
        >
          Click me
        </button>
      </div>
    </div>
  );
};

export default DetailCard;
