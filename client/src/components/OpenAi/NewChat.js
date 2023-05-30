import React from "react";
import styles from "./NavLink.module.css";
const NewChat = ({ setChatLog, setShowMenu }) => {
  return (
    <div
      className={styles.sideMenuButton}
      onClick={() => {
        setChatLog([]);
        setShowMenu(false);
      }}
    >
      <span>+</span>
      New chat
    </div>
  );
};

export default NewChat;
