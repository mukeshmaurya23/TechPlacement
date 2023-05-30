import React, { useContext } from "react";
import { Link } from "react-router-dom";
import banner from "../../../images/banner.jpg";
import css from "./CourseBanner.module.css";
import { AuthContext } from "../../store/auth-login";
const CourseBanner = () => {
  const [state] = useContext(AuthContext);
  return (
    <>
      <Link className={css.outerDiv} to="/coursePage" style={{ color: "#000" }}>
        <img src={banner} alt="banner" className={css.img} />
        <div className={css.box}>
          <div className={css.ttl}>Code your future</div>
          <div className={css.desc}>
            Take control of your career. Learn the latest skills in Software
            development.
          </div>
          <p style={{ fontWeight: "700" }}>Welcome {state.user.firstName}!</p>
        </div>
      </Link>
    </>
  );
};

export default CourseBanner;
