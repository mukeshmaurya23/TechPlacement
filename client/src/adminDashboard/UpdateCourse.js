import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { GET_COURSE, UPDATE_COURSE } from "../constant";
const { useParams } = require("react-router-dom");
const UpdateCourse = () => {
  const courseId = useParams().cId;
  console.log(courseId);
  const [foundCourse, setFoundCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addCourse, setAddCourse] = useState([]);

  const [lesson, setLesson] = useState([]);

  const handleAddLesson = (e) => {
    e.preventDefault();
    const count = addCourse.length;
    lesson.push({
      title: "",
      description: "",
      video: "",
    });
    console.log("setpf", count, lesson);
    setAddCourse([
      ...addCourse,
      <>
        <div className="p-3">
          <div class="form-group m-2">
            <label>Lesson Title</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter title for lesson"
              name={`title${count}`}
              onChange={(e) => {
                setLesson((prevState) => {
                  var val = e.target.value;
                  lesson[count].title = val;
                  return lesson;
                });
              }}
            />
          </div>
          <div class="form-group m-2">
            <label>Lesson Description</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter description for lesson"
              name={`description${count}`}
              onChange={(e) => {
                setLesson((prevState) => {
                  var val = e.target.value;
                  lesson[count].description = val;
                  return lesson;
                });
              }}
            />
          </div>
          <div class="form-group m-2">
            <label>Lesson Video</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter video for lesson"
              name={`video${count}`}
              onChange={(e) => {
                setLesson((prevState) => {
                  var val = e.target.value;
                  lesson[count].video = val;
                  return lesson;
                });
              }}
            />
          </div>
        </div>
      </>,
    ]);
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(GET_COURSE)
      .then((res) => {
        setFoundCourse(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const identifiedCourse = foundCourse.find(
    (course) => course._id === courseId
  );
  const updateHandler = (e) => {
    e.preventDefault();
    const url = `${UPDATE_COURSE}/${courseId}`;
    axios
      .put(url, {
        lessons: lesson,
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Course Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error in updating course");
      });
  };

  return (
    <>
      <div className="container">
        <div class="card  w-100" style={{ marginTop: "5.3rem" }}>
          <h5 class="card-header">Update Course</h5>
          <div class="card-body align-items-center">
            <h5 class="card-title">
              {identifiedCourse ? identifiedCourse.title : "Loading..."}
            </h5>
            <p class="card-text">
              <form onSubmit={updateHandler}>
                {loading && <h1>Loading...</h1>}
                <div className="form-group p-3">
                  <button
                    onClick={handleAddLesson}
                    className="btn btn-outline-primary"
                  >
                    Add Lesson
                  </button>
                  {addCourse}
                </div>
                <button type="submit" className="btn btn-primary">
                  Update Course
                </button>
              </form>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCourse;
