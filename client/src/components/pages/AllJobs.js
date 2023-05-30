import React from "react";
//import NewsTicker from "../../UI/NewsTicker";

import latest from "../../images/latest.png";
import Footer from "../Footer/Footer";
import styles from "./AllJobs.module.css";

import NewsTicker from "../../UI/NewsTicker";

import Testing from "../Jobs/Testing";
import Header from "../../resumeFunction/Header/Header";
import Body from "../../resumeFunction/Body/Body";
import useMediaQuery from "../../hooks/useMediaQuery";
import SidePages2 from "../SidePages/SidePages2";
import { Outlet } from "react-router-dom";
const AllJobs = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <>
      <div
        className="container"
        style={{
          marginTop: "100px",
        }}
      >
        <Testing />
      </div>
      <div>
        {/* <h5 className="text-center p-4 font-weight-bold">
          TechPlacement - Helping People get their Dream Jobs!
        </h5> */}
        <Outlet />
        <div className="container mt-3">
          <h4 className="font-weight-bold p-2">
            Latest Jobs and Internships updates!!
          </h4>

          <NewsTicker />
        </div>

        {isMobile ? (
          <p className="text-center font-monospace font-weight-bold">
            Access Resume Builder Feature on Desktop
          </p>
        ) : (
          <div className={styles.isMobileHeader}>
            <Header />
          </div>
        )}
        <div className={styles.isMobile}>{isMobile ? null : <Body />}</div>
      </div>

      <Footer />
    </>
  );
};

export default React.memo(AllJobs);
