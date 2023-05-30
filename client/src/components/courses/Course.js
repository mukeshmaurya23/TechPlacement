import { useParams } from "react-router-dom";
import LessonSummary from "../courses/LessonSummary";
import { Link } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import Shimmer from "../../resumeFunction/Resume/ShimmerResume";
import { GET_COURSE } from "../../constant";
function Course() {
  //const [courseFound, setCourseFound] = useState([]);
  const { courseId } = useParams();
  console.log(courseId);
  const { data: courseFound, loading, error } = useFetch(GET_COURSE);

  // const course = courseFound.find(
  //   (course) => course._id === parseInt(courseId)
  // );
  // console.log(course.lessons[0].video);
  // console.log(course);
  return (
    <>
      <div className="conatiner mt-5 p-5">
        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "1rem",
          }}
        >
          {loading && <Shimmer />}
          {error && <div>{error}</div>}
          <div className="row">
            {courseFound.map((course) => {
              if (course._id === courseId) {
                return (
                  <>
                    <div className="col-md-6">
                      <h1 style={{ fontSize: "40px" }}>{course.title}</h1>
                      <p style={{ fontSize: "16px" }}>{course.description}</p>

                      <p style={{ fontSize: "20px" }}>
                        <b>Created by: </b> {course.by}
                      </p>
                      <p style={{ fontSize: "20px" }}>
                        <b>Last Updated : </b>
                        {course.updatedAt.slice(0, 10)}
                      </p>
                      <p style={{ fontSize: "20px" }}>
                        <b>Price: </b> Free
                      </p>
                      <Link to={"/coursePage"}>
                        <button className="btn btn-primary">
                          Back to courses
                        </button>
                      </Link>
                    </div>
                    <div className="col-md-6">
                      {/* <img
                        src={course.image}
                        alt="course"
                        style={{
                          height: "300px",
                          width: "100%",
                          borderRadius: "10px",
                        }}
                      /> */}

                      {course.lessons[0].video ? (
                        <iframe
                          src={course.lessons[0].video}
                          title="YouTube video player"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                          style={{
                            height: "300px",
                            width: "100%",
                            borderRadius: "10px",
                            marginTop: "16px",
                          }}
                        ></iframe>
                      ) : (
                        <img
                          src={course.image}
                          alt="course"
                          style={{
                            height: "300px",
                            width: "100%",
                            borderRadius: "10px",
                          }}
                        />
                      )}
                    </div>
                  </>
                );
              }
            })}
          </div>
        </div>
        <h3 className="mt-3 text-center">
          {courseFound.map((course) => {
            if (course._id === courseId) {
              return course.lessons.length;
            }
          })}{" "}
          Lessons
        </h3>
        <div className="p-2">
          {courseFound.map((course) => {
            if (course._id === courseId) {
              return course.lessons.map((lesson, index) => (
                <LessonSummary
                  courseId={courseId}
                  lesson={lesson}
                  num={index + 1}
                  key={lesson._id}
                />
              ));
            }
          })}
        </div>
      </div>
    </>
  );
}

export default Course;
