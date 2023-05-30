import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CREATE_COURSE } from "../constant";
const AddCourse = () => {
  const [course, setCourse] = useState({
    title: "",
    by: "",
    description: "",
    image: "",
    lessons: [],
  });
  console.log("course", course);
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

  //merege lesson in course lesson array
  useEffect(() => {
    setCourse((prevState) => {
      return { ...prevState, lessons: lesson };
    });
  }, [lesson]);

  const handleAddCourse = (e) => {
    e.preventDefault();
    console.log(course);
    const formdata = new FormData();
    formdata.append("title", course.title);
    formdata.append("by", course.by);
    formdata.append("description", course.description);
    formdata.append("image", course.image);
    formdata.append("lessons", JSON.stringify(course.lessons));

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(CREATE_COURSE, formdata, config)
      .then((res) => {
        console.log(res);
        toast.success("Course Added Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <div className="container-fluid ">
        <div className="row">
          <div className="col">
            <div className="form-group m-2">
              <label>Course Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter title for course"
                onChange={(e) => {
                  setCourse((prevState) => {
                    return { ...prevState, title: e.target.value };
                  });
                }}
              />
            </div>
            <div className="form-group m-2">
              <label>Course By</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter by for course"
                onChange={(e) => {
                  setCourse((prevState) => {
                    return { ...prevState, by: e.target.value };
                  });
                }}
              />
            </div>
            <div className="form-group m-2">
              <label>Course Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter description for course"
                onChange={(e) => {
                  setCourse((prevState) => {
                    return { ...prevState, description: e.target.value };
                  });
                }}
              />
            </div>
            <div className="form-group m-2">
              <label>Course Image</label>
              <input
                type="file"
                className="form-control"
                placeholder="Enter image for course"
                onChange={(e) => {
                  setCourse((prevState) => {
                    return { ...prevState, image: e.target.files[0] };
                  });
                }}
              />
            </div>
            <div className="form-group m-2">
              <label>Course Lessons</label>
              <div className="form-group m-2">
                <button
                  className="btn btn-outline-success"
                  onClick={handleAddLesson}
                >
                  Add Lesson
                </button>
              </div>
              {addCourse}
            </div>
            <div className="form-group p-3">
              <button className="btn btn-primary" onClick={handleAddCourse}>
                Add Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCourse;
