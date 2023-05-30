import React from "react";
import styles from "./NormalCard.module.css";
const NormalCard = (props) => {
  return (
    <div className={`${styles.normalcard} ${props.className}`}>
      {props.children}
    </div>
  );
};

export default React.memo(NormalCard);
