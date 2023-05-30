import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CompleteAndContinueButton from "./CompleteButton";
//import courses from "./courses";
import axios from "axios";
import styles from "./CourseLesson.module.css";
import useFetch from "../../hooks/useFetch";
import Spinner from "../../UI/Spinner";
import { GET_COURSE } from "../../constant";
function Lesson() {
  const [views, setViews] = useState(0);
  const { courseId, lessonId } = useParams();

  //const [courseFound, setCourseFound] = useState([]);

  const { data: courseFound, loading, error } = useFetch(GET_COURSE);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/api/getCourse")
  //     .then((res) => {
  //       console.log(res.data);
  //       setCourseFound(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  //map all the courses into a variable

  const nextLessonId = () => {
    for (let i = 0; i < courseFound.length; i++) {
      if (courseFound[i]._id === courseId) {
        for (let j = 0; j < courseFound[i].lessons.length; j++) {
          if (courseFound[i].lessons[j]._id === lessonId) {
            if (j === courseFound[i].lessons.length - 1) {
              return courseFound[i].lessons[0]._id;
            } else {
              return courseFound[i].lessons[j + 1]._id;
            }
          }
        }
      }
    }
  };

  const handlePlayVideo = () => {
    window.parent.postMessage({ type: "playVideo" }, "*");
  };
  useEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.data.type === "playVideo") {
        setViews(views + 1);
      }
    });
    return () => {
      window.removeEventListener("message", handlePlayVideo);
    };
  }, [views]);

  return (
    <>
      <main className={styles.main}>
        <section className={styles["figure-section"]}>
          {loading && <Spinner />}
          {error && <div>{error}</div>}
          {courseFound.map((course) => {
            if (course._id === courseId) {
              return course.lessons.map((lesson) => {
                if (lesson._id === lessonId) {
                  return (
                    <>
                      <figure style={{ marginTop: "10px" }}>
                        <iframe src={lesson.video} allowfullscreen></iframe>

                        <figcaption>
                          <h4>
                            <b>{course.title}</b>
                          </h4>
                        </figcaption>
                      </figure>

                      <div className={styles["views-main"]}>
                        <div className={styles["views-left"]}>
                          <p
                            style={{
                              marginLeft: "10px",
                              fontSize: "14px",
                              marginRight: "10px",
                            }}
                          >
                            {views} views
                          </p>
                          <i class="fas fa-circle"></i>

                          <p
                            style={{
                              marginLeft: "10px",
                              fontSize: "14px",
                              marginRight: "10px",
                            }}
                          >
                            Updated At {course.updatedAt.slice(0, 10)}
                          </p>
                        </div>
                        <div className={styles["view-right"]}>
                          <CompleteAndContinueButton
                            courseId={courseId}
                            lessonId={nextLessonId()}
                          />
                        </div>
                      </div>

                      <hr
                        style={{
                          width: "100%",
                          borderTop: "2px solid #ccc",
                          marginTop: "16px",
                        }}
                      />

                      <div className={styles["video-discription"]}>
                        <div className={styles["video-fl-des"]}>
                          <div className={styles["video-discription-left"]}>
                            <img
                              className={styles["net-img"]}
                              src={course.image}
                              alt="course"
                            />
                            <div className={styles["main-vid-div"]}>
                              <div className={styles["vid-div-up"]}>
                                <button
                                  className={styles["btn-ninja"]}
                                  style={{
                                    marginLeft: "10px",
                                  }}
                                >
                                  {course.by}
                                </button>
                                <i class="fas fa-check-circle check-icon"></i>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class={styles["vid-des-info"]}>
                          <p
                            style={{
                              marginLeft: "10px",
                              fontSize: "14px",
                              marginRight: "10px",
                            }}
                          >
                            {lesson.description}
                          </p>
                        </div>
                      </div>
                    </>
                  );
                }
              });
            }
          })}

          <hr />
        </section>
        <aside
          class={styles["side-tag-main"]}
          style={{
            paddingTop: "50px",
          }}
        >
          <div class={styles["side-tag-top"]}>
            {courseFound.map((course) => {
              if (course._id === courseId) {
                return (
                  <>
                    <div class={styles["l-s-thumb"]}>
                      <h4>
                        <b>Course Content</b>
                      </h4>
                    </div>
                    <div class={styles["r-s-thumb"]}>
                      <i
                        class="fas fa-arrow-left"
                        style={{
                          marginRight: "10px",
                        }}
                      ></i>
                      <Link to={"/courses/" + course._id}>
                        <button
                          style={{
                            backgroundColor: "#ccc",
                            border: "none",
                            cursor: "pointer",
                            borderRadius: "5px",
                            padding: "0.8rem",
                          }}
                        >
                          Back to {course.title}
                        </button>
                      </Link>
                    </div>
                  </>
                );
              }
            })}
          </div>
          <hr />
          {courseFound.map((course) => {
            if (course._id === courseId) {
              return course.lessons.map((lesson) => {
                return (
                  <div class={styles["side-tag-bottom"]}>
                    <div class={styles["l-s-thumb"]}>
                      <div class={styles["thumbnail-img"]}>
                        <iframe
                          src={lesson.video}
                          allowfullscreen
                          style={{
                            height: "150px",
                            border: "none",
                            width: "300px",
                          }}
                        ></iframe>
                      </div>
                      <Link
                        to={`/courses/${course._id}/lessons/${lesson._id}`}
                        className="text-decoration-none text-dark"
                      >
                        <span
                          style={{
                            borderRadius: "50%",
                            background: "#f8f9fa",
                            padding: "0.4rem",
                          }}
                        >
                          {lesson.id}
                        </span>
                        {lesson.title}
                      </Link>
                    </div>

                    <div class={styles["s-b-view"]}>
                      <p
                        style={{
                          marginLeft: "10px",
                          fontSize: "14px",
                          marginRight: "10px",
                        }}
                      >
                        <i class="fas fa-eye"></i>
                        {lesson.views}
                      </p>
                    </div>
                  </div>
                );
              });
            }
          })}
        </aside>
      </main>
    </>
  );
}

export default Lesson;

/* <div className="container mt-5 p-5">
      <div className="row">
        <div className="col-md-3">
          <ul class="list-group">
            <li class="list-group-item disabled text-center">
              <h4>Lessons</h4>
            </li>
            {course.lessons.map((lesson, index) => (
              <li class="list-group-item">
                <Link
                  to={`/courses/${course.id}/lessons/${lesson.id}`}
                  className="text-decoration-none text-dark"
                >
                  <span
                    style={{
                      borderRadius: "50%",
                      background: "#f8f9fa",
                      padding: "0.4rem",
                    }}
                  >
                    {index + 1}
                  </span>
                  {lesson.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="col-md-6"
          style={{
            border: "2px solid #ccc",
            padding: "1rem",
          }}
        >
          <iframe
            width="600"
            height="345"
            src={lesson.video}
            style={{
              maxWidth: "100%",
            }}
          ></iframe>
          <CompleteAndContinueButton
            courseId={courseId}
            lessonId={nextLessonId()}
          />
          <Link to={"/courses/" + course.id}>
            <button className="btn btn-success mx-3 mt-4">
              Back to {course.title}
            </button>
          </Link>
        </div>
      </div>
    </div> */
/**
 * 
 * <div className="Lesson page" style={styles.page}>
      <header style={{ marginBottom: "2rem" }}>
        <p>
          <Link to={"/courses/" + course.id}>Back to {course.title}</Link>
        </p>
        <h1>{lesson.title}</h1>
      </header>
      <div className="Content">
        <iframe width="700" height="345" src={lesson.video}></iframe>
        <CompleteAndContinueButton
          courseId={courseId}
          lessonId={nextLessonId()}
        />
      </div>
    </div>
 */
