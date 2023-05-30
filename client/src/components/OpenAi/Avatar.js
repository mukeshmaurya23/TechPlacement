import React from "react";
import styles from "./Avatar.module.css";
const Avatar = ({ children, bg, className }) => {
  return (
    <div className={styles.avatar} style={{ backgroundColor: `${bg}` }}>
      <div className={className}>{children}</div>
    </div>
  );
};

export default Avatar;
