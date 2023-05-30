import React, { useRef, useState, useEffect, useContext } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css/pagination";
import "./Testimonial.css";
import { toast } from "react-toastify";
import axios from "axios";
import CommentMain from "./comment/CommentMain";
import { AuthContext } from "../components/store/auth-login";
import { GET_TESTIMONIAL, DELETE_TESTIMONIAL } from "../constant";
function Testimonial() {
  const [state, setState] = useContext(AuthContext);
  const [testimonial, setTestimonial] = useState([]);

  useEffect(() => {
    axios

      .get(GET_TESTIMONIAL)
      .then((res) => {
        setTestimonial(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const deleteTestimonial = (id) => {
    axios
      .delete(DELETE_TESTIMONIAL + "/" + id)
      .then((res) => {
        toast.success("Testimonial Deleted Successfully");
        window.location.reload();
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  return (
    <>
      <Swiper
        style={{
          zIndex: "0",
        }}
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {testimonial.map((item) => {
          return (
            <>
              <SwiperSlide>
                <div
                  className="col-12 col-sm-6 col-md-4 col-lg-3 "
                  style={{ width: "100%", cursor: "pointer" }}
                >
                  <div
                    className="shadow-sm card mt-3 setReviewCardBorder testimonial-card col mb-3"
                    style={{ cursor: "pointer" }}
                  >
                    <div className="row pl-3 pr-0 pt-2">
                      <div className="col-3 col-sm-2 alignNameDesig">
                        <img
                          src="https://img.icons8.com/plasticine/2x/000000/user.png"
                          className="rounded-circle img-fluid testimonialImage"
                          alt="user"
                        />
                      </div>
                      <div className="text-left alignNameDesig col-9 col-sm-10 pl-0">
                        <div className="h5 sofiaProSemiBold mb-1">
                          {item.name}
                        </div>
                        <div
                          className="text-success sofiaProSemiBold testachievement"
                          style={{ lineHeight: "22px" }}
                        >
                          {item.designation}
                        </div>
                      </div>
                    </div>
                    <div className="card-body pt-3">
                      <span
                        className="read-more-testimonial"
                        style={{
                          float: "right",
                          fontSize: "12px",
                          color: "rgba(40,167,69",
                        }}
                        onClick={() => {
                          console.log("clicked");
                        }}
                      >
                        <button
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#GFG"
                          style={{
                            background: "transparent",
                            border: "none",
                            outline: "none",
                            color: "rgba(40,167,69)",
                          }}
                        >
                          Read Success Story
                        </button>

                        <i className="fas fa-angle-double-right"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </>
          );
        })}
      </Swiper>

      <div class="modal fade" id="GFG">
        <div
          class="modal-dialog modal-lg
						modal-dialog-scrollable "
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="GFGLabel">
                TechPlacement Success Story and Placement Experience
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <nav className="nav-tabs">
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button
                    className="nav-link active"
                    id="nav-home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-home"
                    type="button"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    Success Story
                    {
                      <span
                        className="badge rounded-pill bg-success "
                        style={{
                          marginLeft: "5px",
                        }}
                      >
                        {testimonial.length}
                      </span>
                    }
                  </button>
                </div>
              </nav>

              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-home"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                >
                  {testimonial.map((item) => {
                    return (
                      <>
                        <div
                          className="col-12 col-sm-6 col-md-4 col-lg-3 "
                          style={{
                            width: "100%",
                            cursor: "pointer",
                          }}
                        >
                          <div
                            className="shadow-sm card mt-3 setReviewCardBorder testimonial-card col mb-3"
                            style={{ cursor: "pointer" }}
                          >
                            <div className="row pl-3 pr-0 pt-2">
                              <div className="col-3 col-sm-2 alignNameDesig">
                                <img
                                  src="https://img.icons8.com/plasticine/2x/000000/user.png"
                                  className="rounded-circle img-fluid testimonialImage"
                                  alt="user"
                                  style={{
                                    borderRadius: "50%",
                                    backgroundColor: "#ccc",
                                    marginLeft: "10px",
                                  }}
                                />
                              </div>
                              <div className="text-left alignNameDesig col-5 col-sm-10 pl-0">
                                <div className="h5 sofiaProSemiBold mb-1">
                                  {item.name}
                                </div>
                                <div
                                  className="text-success sofiaProSemiBold testachievement"
                                  style={{ lineHeight: "22px" }}
                                >
                                  {item.designation}
                                </div>
                                <div
                                  class="card-text text-left text-muted urw-din pt-3 makingResponsiveText"
                                  style={{
                                    fontSize: "14px",
                                    lineHeight: "22px",
                                    color: "#6c757d",
                                    padding: "0px 10px 0px 10px",
                                    marginBottom: "10px",
                                    marginLeft: "-10px",
                                  }}
                                >
                                  {item.description}
                                </div>
                              </div>
                            </div>
                            {state &&
                              state.user &&
                              state.user.role === "admin" && (
                                <button
                                  className="btn btn-outline-danger btn-sm"
                                  onClick={() => deleteTestimonial(item._id)}
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              )}
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>

              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Testimonial;
