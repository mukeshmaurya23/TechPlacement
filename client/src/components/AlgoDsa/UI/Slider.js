import React from "react";
import styles from "./Slider.module.css";
const Slider = ({ onChange, disabled }) => {
  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <div className={styles["slider-title"]}>Select Speed</div>
        <div className={styles["speed-slider"]} onChange={onChange}>
          <input
            type="radio"
            name="speed"
            id="slow"
            value={80}
            disabled={disabled}
          />
          <label htmlFor="slow" current-speed="Slow"></label>
          <input
            type="radio"
            name="speed"
            id="medium"
            value={50}
            defaultChecked
            disabled={disabled}
          />
          <label htmlFor="medium" current-speed="Medium"></label>
          <input
            type="radio"
            name="speed"
            id="fast"
            value={5}
            disabled={disabled}
          />
          <label htmlFor="fast" current-speed="Fast"></label>
          <div className={styles["slider-position"]}></div>
        </div>
      </form>
    </div>
  );
};

export default Slider;
