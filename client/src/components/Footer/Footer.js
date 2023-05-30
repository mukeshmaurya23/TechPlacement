import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer
        className="text-center text-lg-start text-white"
        style={{ backgroundColor: "#3e4551", width: "100%" }}
      >
        <div className="container p-4 pb-0">
          <section className="">
            <div className="row">
              <div className="col-lg-4 col-md-4 mb-4 mb-md-0">
                <h5 className="text-uppercase">About Us</h5>

                <p>
                  TechPlacement aims to provide one-stop solution for students
                  which covers company specific preparation materials, offcampus
                  jobs and internships updates and so on..
                </p>
              </div>
              <div className="col-lg-4 col-md-4 mb-4 mb-md-0">
                <h5 className="text-uppercase">Conatct Us</h5>
                <p style={{ cursor: "pointer" }}>mukeshmaurya@duck.com</p>
              </div>
              <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">UseFul Links</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <Link
                      to="/allcomapnies"
                      className="text-white"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      All Companies
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/alljobs"
                      className="text-white"
                      style={{ textDecoration: "none" }}
                    >
                      All jobs
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <hr className="mb-4" />

          {/* <section className="mb-4 text-center">
            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i className="fab fa-instagram"></i>
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i className="fab fa-github"></i>
            </a>
          </section> */}
        </div>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          <Link
            className="text-white"
            to="/"
            style={{ textDecoration: "none" }}
          >
            © 2022 TechPlacement: All Rights Reserved
          </Link>
        </div>
      </footer>
    </>
  );
};

export default React.memo(Footer);
