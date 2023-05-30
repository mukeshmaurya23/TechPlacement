import styles from "./Main.module.css";
// import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Main = () => {
  // const navigate = useNavigate();
  //const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    //clear all previous routes until the root route
    //window.history.go(-(window.history.length - 1));
    window.location.href = "/";
  };

  return (
    <div className={styles.maincontainer}>
      <nav className={styles.navbar}>
        <h3>Are you sure you want to log-off?</h3>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Main;
