import React from "react";
import styles from "./SidePage1.module.css";
import { Link } from "react-router-dom";
const SidePage1 = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.headline}>
          <p>1. Get discovered </p>
          <p>2. Get contacted </p>
          <p>3. Get hired </p>
        </div>
        <div className={styles.img}>
          <span>
            <img
              className={styles.first}
              src="https://img.naukimg.com/logo_images/groups/v1/36136.gif"
              alt=""
            />
          </span>
          <span>
            <img
              className={styles.sec}
              src="https://img.naukimg.com/logo_images/groups/v1/181534.gif"
              alt=""
            />
          </span>
          <span>
            <img
              className={styles.third}
              src=" https://img.naukimg.com/logo_images/groups/v1/619188.gif"
              alt=""
            />
          </span>
          <span>
            <img
              className={styles.fourth}
              src="https://img.naukimg.com/logo_images/groups/v1/614576.gif"
              alt=""
            />
          </span>
        </div>
        <div className={styles.paragraph}>
          <h3 className={styles.firstline}>
            Become searchable by top companies in your domain
          </h3>
          <p className={styles.smallline}>
            Companies search for candidate CVs directly for open positions
          </p>
          <Link to="/AllJobs">
            <button className="btn btn-primary">Get Started</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SidePage1;
