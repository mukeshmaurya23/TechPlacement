import React from "react";
import styles from "./NavLink.module.css";
const NavLinks = ({ svg, link, text, setChatLog }) => {
  const handleClick = (text) => {
    if (text === "Clear Conversations") setChatLog([]);
  };
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      style={{ textDecoration: "none" }}
      onClick={() => handleClick(text)}
    >
      <div className={styles.navPrompt}>
        {svg}
        <p>{text}</p>
      </div>
    </a>
  );
};

export default NavLinks;
