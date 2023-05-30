import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { AuthContext } from "../store/auth-login";
import jQuery from "jquery";
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";

import useOnline from "../../hooks/useOnline";
// import avtar from "../../images/TechPlacement.png";
//import SideDrawer from "./SideDrawer";

const CategoriesData = [
  {
    id: 1,
    categories: "Placement",
  },
  {
    id: 2,
    categories: "Internship",
  },
  {
    id: 3,
    categories: "IT and Cs Jobs",
  },
  {
    id: 4,
    categories: "Development",
  },
  {
    id: 5,
    categories: "It and Services",
  },
];
const Navbar = () => {
  const [state, setState] = useContext(AuthContext);
  console.log(state);
  let user = localStorage.getItem("token");

  $(document).ready(function () {
    $(".dropdown").hover(
      function () {
        $(".dropdown-menu", this).stop(true, true).slideDown("fast");
        $(this).toggleClass("open");
      },
      function () {
        $(".dropdown-menu", this).stop(true, true).slideUp("fast");
        $(this).toggleClass("open");
      }
    );
  });
  const isOnline = useOnline();

  return (
    <div className={styles.header}>
      <nav
        className=" p-3 navbar navbar-expand-sm"
        style={{ boxShadow: " 0 0 5px lightgray" }}
      >
        <div className="container-fluid ">
          <Link to="/" className="navbar-brand pe-3">
            <span className={styles.spanHeading}>
              Tech<span className={styles.spanHeadingtwo}>Placement</span>
            </span>

            {/* <img src={logo} alt="logo" className={styles.logo} /> */}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <div
              className="me-auto navbar-nav mt-1"
              style={{ fontSize: "1.1rem" }}
            >
              {!user && (
                <div className="navbar-nav">
                  <div class="dropdown">
                    <button
                      class="btn btn-default dropdown-toggle"
                      type="button"
                    >
                      Categories <span class="caret"></span>
                    </button>

                    <ul
                      class="dropdown-menu text-center"
                      style={{
                        border: "1px solid lightgray",
                        borderRadius: "5px",
                      }}
                    >
                      {CategoriesData.map((item) => {
                        return (
                          <li
                            style={{
                              listStyle: "none",
                              margin: "1rem",
                            }}
                            key={item.id}
                          >
                            <Link
                              to="/"
                              style={{
                                textDecoration: "none",
                                color: "black",
                                padding: "10px",
                              }}
                            >
                              {item.categories}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              )}

              {/* {state && state.user ? (
                <Link to="/allcomapnies" className="nav-link ">
                  All Companies
                </Link>
              ) : null} */}
              {user && (
                <Link to="/allcomapnies" className="nav-link ">
                  All Companies
                </Link>
              )}
              {/* <Link to="/allcomapnies" className="nav-link ">
                All Companies
              </Link> */}
              {user && (
                <Link to="/alljobs" className="nav-link ">
                  All Jobs
                </Link>
              )}
            </div>
            {user ? (
              <div className="navbar-nav">
                {state != null && (
                  <>
                    <div className="half">
                      <label
                        htmlFor="profile2"
                        className={styles["profile-dropdown"]}
                      >
                        <input type="checkbox" id="profile2" />

                        {state && state.user && state.user.picture ? (
                          <img
                            src={state.user.picture}
                            alt=""
                            className={styles.profile}
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <img
                            // src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                            src="https://cdn0.iconfinder.com/data/icons/avatars-3/512/avatar_hipster_guy-512.png"
                            alt="profile"
                            className={styles.profile}
                          />
                        )}

                        <span>
                          {state && state.user && state.user.firstName}
                        </span>

                        <ul>
                          <li>
                            <Link to="#">
                              <span className={styles.email}>
                                <i
                                  class="fa fa-envelope-o p-1 me-2"
                                  aria-hidden="true"
                                ></i>
                                {state && state.user && state.user.email}
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/logout" className="nav-link ">
                              <i
                                class="fa fa-sign-out "
                                aria-hidden="true"
                                style={{ marginLeft: "10px" }}
                              ></i>
                              Logout
                            </Link>
                          </li>
                          {state &&
                            state.user &&
                            state.user.role === "admin" && (
                              <li>
                                <Link to="/admin/data" className="nav-link ">
                                  <i
                                    class="fa fa-lock"
                                    aria-hidden="true"
                                    style={{ marginLeft: "10px" }}
                                  ></i>
                                  Admin
                                </Link>
                              </li>
                            )}
                          <li>
                            <Link to="/" className="nav-link ">
                              {!isOnline ? (
                                <>
                                  <i
                                    class="fa fa-circle"
                                    style={{
                                      color: "red",
                                      fontSize: "10px",
                                      marginLeft: "10px",
                                    }}
                                  ></i>
                                  Offline
                                </>
                              ) : (
                                <>
                                  <i
                                    class="fa fa-circle"
                                    style={{
                                      color: "green",
                                      fontSize: "10px",
                                      marginLeft: "10px",
                                    }}
                                  ></i>
                                  Online
                                </>
                              )}
                            </Link>
                          </li>
                        </ul>
                      </label>
                    </div>
                  </>
                )}
              </div>
            ) : (
              //create a two divs one for login and one for signup
              <>
                <div className="navbar-nav">
                  <div class={styles.box}>
                    <input
                      type="search"
                      placeholder="What you want to Learn ..."
                    />
                    <i
                      class="fa fa-search"
                      style={{
                        position: "absolute",
                        top: "15px",
                        right: "15px",
                        color: "gray",
                      }}
                    ></i>
                  </div>
                </div>
                <button className="btn btn-outline-success me-2">
                  <Link to="/login" className="nav-link ">
                    Login
                  </Link>
                </button>
                <button className="btn btn-success">
                  <Link
                    to="/signup"
                    className="nav-link "
                    style={{
                      color: "white",
                    }}
                  >
                    Signup
                  </Link>
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default React.memo(Navbar);
/*


 <Link
                    to="/user/dashboard"
                    className="nav-link bg-white"
                    style={{ fontSize: "1.1rem" }}
                  >
                    {state && state.user && state.user.firstName}
                  </Link>
                  <Link
                    to="/logout"
                    className="nav-link bg-white"
                    style={{ fontSize: "1.1rem" }}
                  >
                    Logout
                  </Link>
*/
