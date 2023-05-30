import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
const Abc = (props) => {
  return (
    <div>
      <div class="row container p-2">
        <div class="col-sm-10 ">
          <div class="job-card">
            <div class="job-card__content">
              <div class="job-card_img">
                <img src={props.logo} alt="Company Logo" />
              </div>
              <div class="job-card_info">
                <h6 class="text-muted">
                  <Link to="/" class="job-card_company">
                    {props.name}
                  </Link>
                  <a href="#!" class="float-right m-1">
                    <i class="fa fa-heart-o"></i>
                  </a>
                </h6>
                <h4>{props.role}</h4>
                <span class="job-card_type">{props.location}</span>
              </div>
              <i class="fa fa-calendar-check-o" aria-hidden="true"></i>
              <code className="m-2">{props.date}</code>
            </div>
            <div class="job-card__footer">
              <div class="job-card_job-type">
                <span class="job-label">{props.workingTime}</span>
                <span class="job-label">Senior</span>
                <span class="job-label">UX/UI</span>
              </div>
              {
                <Link to={`/jobs/${props._id}`} className=" float-right">
                  <button class="btn btn-primary">Apply</button>
                </Link>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Abc;
