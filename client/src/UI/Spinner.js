import React from "react";
import styles from "./Spinner.module.css";
const Spinner = () => {
  return (
    // <div className="d-flex justify-content-center">
    //   <div className="spinner-border" role="status">
    //     <span className="sr-only text-primary">Loading...</span>
    //   </div>
    // </div>
    <>
      <div className={styles.loader}>
        <span className={styles.span}></span>
        <span className={styles.span}></span>
        <span className={styles.span}></span>
        <span className={styles.span}></span>
        <span className={styles.span}></span>
        <span className={styles.span}></span>
      </div>
    </>
  );
};

export default Spinner;
