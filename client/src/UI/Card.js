import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { LOCALHOST } from "../constant";
const Card = (props) => {
  return (
    // <div className="container mt-4">
    //   <div className="card" style={{ width: "23rem" }}>
    //     <div className="card-body">
    //       <h5 className="card-title text-center">{props.title}</h5>
    //       <div className="text-center">
    //         <img
    //           src={props.image}
    //           className="card-img-top mb-2 rounded mt-2"
    //           alt="..."
    //           style={{ height: "50%", width: "50%" }}
    //         />
    //       </div>
    //       <p className="card-text">
    //         Some quick example text to build on the card title and make up the
    //         bulk of the card's content.
    //       </p>
    //       <p className="btn btn-primary">Go somewhere</p>
    //     </div>
    //   </div>
    // </div>
    <>
      <div className=" text-center">
        <div className="row">
          <div className="col mb-3 ">
            <div className={`${styles.card} card cards h-100`}>
              <Link
                className="text-dark text-decoration-none"
                to={`/company/${props.link}`}
              >
                <h4 className="card-title text-center">{props.title}</h4>
                <div className="text-center">
                  <img
                    src={`${LOCALHOST}/${props.image}`}
                    className="card-img-top mb-2 rounded mt-2"
                    alt="..."
                    referrerPolicy="no-referrer"
                    style={{ height: "138.9px", width: "138.9px" }}
                  />
                </div>
                <p className={`${styles.maxText} card-text `}>
                  {props.description}
                </p>
                <button className="btn btn-primary">Read More</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default React.memo(Card);
