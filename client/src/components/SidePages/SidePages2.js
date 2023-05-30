import React from "react";
import styles from "./SidePages2.module.css";
//import axios from "axios";
import { Link, Outlet } from "react-router-dom";
//import { toast } from "react-toastify";
const SidePages2 = () => {
  // const [jobs, setJobs] = useState([]);
  //const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchJobs = async () => {
  //     setLoading(true);
  //     try {
  //       const url = `${process.env.REACT_APP_URL}/api/getJobs`;
  //       const response = await axios.get(url);
  //       setJobs(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       setLoading(false);
  //       toast.error("Something went wrong");
  //     }
  //   };
  //   fetchJobs();
  // }, []);

  return (
    <>
      <h3 className={styles.explore}>Explore top companies hiring now</h3>
      <div className={styles.explorediv}>
        <div className={`${styles.cards} text-center `}>
          <h3>
            MNCs<span></span>
          </h3>
          <p>0 are actively hiring</p>
          <div className={styles.cardimg}>
            <img
              src="https://img.naukimg.com/logo_images/groups/v1/62866.gif"
              alt=""
            />
            <img
              src="https://img.naukimg.com/logo_images/groups/v1/20302.gif"
              alt=""
            />
            <img
              src="https://img.naukimg.com/logo_images/groups/v1/125596.gif"
              alt=""
            />
            <img
              src="https://img.naukimg.com/logo_images/groups/v1/19288.gif"
              alt=""
            />
          </div>
        </div>

        <div className={`${styles.cards} text-center`}>
          <h3>Product based companies</h3>
          <p>0 are actively hiring</p>
          <div className={styles.cardimg}>
            <img
              src="https://img.naukimg.com/logo_images/groups/v1/434716.gif"
              alt=""
            />
            <img
              src="https://img.naukimg.com/logo_images/groups/v1/36136.gif"
              alt=""
            />
            <img
              src="https://img.naukimg.com/logo_images/groups/v1/1718706.gif"
              alt=""
            />
            <img
              src="https://img.naukimg.com/logo_images/groups/v1/169656.gif"
              alt=""
            />
          </div>
        </div>

        <div className={`${styles.cards} text-center`}>
          <h3>Startups</h3>
          <p> 0 are actively hiring</p>
          <div className={styles.cardimg}>
            <img
              src="https://img.naukimg.com/logo_images/groups/v1/2444130.gif"
              alt=""
            />
            <img
              src="https://img.naukimg.com/logo_images/groups/v1/1640596.gif"
              alt=""
            />
            <img
              src="https://img.naukimg.com/logo_images/groups/v1/1383834.gif"
              alt=""
            />
            <img
              src="https://img.naukimg.com/logo_images/groups/v1/1284194.gif"
              alt=""
            />
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default SidePages2;
