import React, { useState, useEffect } from "react";
import styles from "./SidePage3.module.css";
import axios from "axios";
import { GET_JOBS } from "../../constant";
const SidePage3 = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    axios
      .get(GET_JOBS)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const countVar = data.filter((exp) => exp.experience.startsWith("0")).length;

  const titleSoftwareEngineer = data.filter(
    (exp) =>
      exp.role.trim().toLowerCase().startsWith("software developer") ||
      exp.role.trim().toLowerCase().startsWith("software engineer")
  ).length;

  const titleFullStack = data.filter((exp) =>
    exp.role.trim().toLowerCase().startsWith("full stack")
  ).length;
  const titleMobile = data.filter((exp) =>
    exp.role.trim().toLowerCase().startsWith("mobile")
  ).length;
  const titleFrontEnd = data.filter((exp) =>
    exp.role.trim().toLowerCase().startsWith("front end")
  ).length;
  const titleDevOps = data.filter((exp) =>
    exp.role.trim().toLowerCase().startsWith("devops")
  ).length;

  return (
    <>
      <div class={styles.doublebox}>
        <div class={styles.boxfirst}>
          <img
            src="https://static.naukimg.com/s/0/0/i/role-collection.png"
            alt=""
          />
          <h2>Discover jobs across popular roles</h2>
          <p>Select a role and we'll show you relevant jobs for it!</p>
        </div>
        <div class={styles.boxsecond}>
          <div>
            <h3>Full stack developer </h3>
            <p>{titleFullStack} jobs </p>
          </div>
          <div>
            <h3>Mobile/app developer/</h3>
            <p>{titleMobile} jobs </p>
          </div>
          <div>
            <h3>Front end developer</h3>
            <p>{titleFrontEnd} jobs </p>
          </div>
          <div>
            <h3>Devops Engineer</h3>
            <p>{titleDevOps} jobs </p>
          </div>
          <div>
            <h3>
              <span>Software Engineer</span>
            </h3>
            <p>{titleSoftwareEngineer} jobs </p>
          </div>
          <div>
            <h3>Entry level</h3>
            <span>{countVar} jobs</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidePage3;
