import React from "react";
import NormalCard from "./NormalCard";
import styles from "./Modal.module.css";
const Modal = (props) => {
  return (
    <React.Fragment>
      <div className={styles.backdrop} onClick={props.closing} />
      <NormalCard className={styles.modal}>
        <h2>{props.title}</h2>

        <div className={styles.content}>{props.children}</div>

        <footer className={styles.actions}>
          <button
            onClick={props.closing}
            className="btn btn-success text-center"
          >
            <i class="fa fa-times" aria-hidden="true"></i>
          </button>
        </footer>
      </NormalCard>
    </React.Fragment>
  );
};

export default React.memo(Modal);



