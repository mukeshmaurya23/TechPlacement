import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CREATE_DATA } from "../../src/constant";
const AddCompany = (props) => {
  const [addQuestion, setAddQuestion] = useState([]);
  //for adding problem statement
  // const [pid, setPid] = useState("");
  // const [pQuestion, setpQuestion] = useState("");
  // const [pTopic, setpTopic] = useState("");
  // const [pdescription, setpDescription] = useState("");
  const [problemStatement, setProblemStatement] = useState([
    // {
    //   id: "",
    //   q1: "",
    //   topic: "",
    //   description: "",
    // },
    // {
    //   id: "",
    //   q1: "",
    //   topic: "",
    //   description: "",
    // },
  ]);
  const navigate = useNavigate();
  const handleAddQuestion = (e) => {
    e.preventDefault();
    //count of problem statement
    const count = addQuestion.length;
    // adding problem statement
    problemStatement.push({
      id: "",
      q1: "",
      topic: "",
      description: "",
    });
    console.log("setpf", count, problemStatement);
    setAddQuestion([
      ...addQuestion,

      <>
        <div className="p-3">
          <div class="form-group">
            <label>Id</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter id for problemStatement"
              name={`id${count}`}
              onChange={(e) => {
                // setPid((prevState) => {
                //   var val = e.target.value;
                //   return { ...prevState, [e.target.name]: val };
                // });
                setProblemStatement(
                  (prevState) => {
                    var val = e.target.value;

                    problemStatement[count].id = val;
                    return problemStatement;
                  },
                  () => {
                    console.log("setpff", count, problemStatement);
                  }
                );
              }}
            />
          </div>
          <div class="form-group">
            <label>Questions</label>
            <input
              type="text"
              class="form-control"
              placeholder="enter the question"
              name={`q1${count}`}
              onChange={(e) => {
                // setpQuestion((prevState) => {
                //   var val = e.target.value;
                //   return { ...prevState, [e.target.name]: val };
                // });
                setProblemStatement((prevState) => {
                  var val = e.target.value;
                  problemStatement[count].q1 = val;
                  return problemStatement;
                });
              }}
            />
          </div>
          <div class="form-group">
            <label>Topic</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter the topic"
              name={`topic${count}`}
              onChange={(e) => {
                // setpTopic((prevState) => {
                //   var val = e.target.value;
                //   return { ...prevState, [e.target.name]: val };
                // });
                setProblemStatement((prevState) => {
                  var val = e.target.value;
                  problemStatement[count].topic = val;
                  return problemStatement;
                });
              }}
            />
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea
              id="mytextarea"
              class="form-control"
              rows="3"
              placeholder="Enter the description of problemStatement"
              name={`description${count}`}
              onChange={(e) => {
                // setpDescription((prevState) => {
                //   var val = e.target.value;
                //   return { ...prevState, [e.target.name]: val };
                // });
                setProblemStatement((prevState) => {
                  var val = e.target.value;
                  problemStatement[count].description = val;
                  return problemStatement;
                });
              }}
            />
          </div>
        </div>
      </>,
    ]);
  };

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const [link, setLink] = useState("");
  const [carrerLink, setCareerLink] = useState("");
  console.log(image);

  const AddId = (e) => {
    setId(e.target.value);
  };
  const AddTitle = (e) => {
    setTitle(e.target.value);
  };
  const AddDescription = (e) => {
    setDescription(e.target.value);
  };
  const AddImage = (e) => {
    setImage(e.target.files[0]);
    console.log("image", e.target.files[0]);
  };

  const AddLink = (e) => {
    setLink(e.target.value);
  };

  const AddCareerLink = (e) => {
    setCareerLink(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("id", id);
    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("image", image);
    formdata.append("link", link);
    formdata.append("carrerLink", carrerLink);
    formdata.append("problemStatement", JSON.stringify(problemStatement));

    console.log("mukesh", formdata);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    props.addPost(formdata);
    axios
      .post(CREATE_DATA, formdata, config)
      .then((res) => {
        console.log(res);

        toast.success("Data added successfully");
        //update data on page without refreshing after adding data

        props.setModal(false);
        navigate("/admin/data/add-company");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        console.log("Data added");
      });

    setId("");
    setTitle("");
    setDescription("");
    setImage("");
    setLink("");
    setCareerLink("");
    setProblemStatement([]);
    setAddQuestion([]);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <div c>
              <label for="id">Id:</label>
              <input
                type="text"
                name="id"
                className="form-control"
                onChange={AddId}
                placeholder="Enter Id"
              />
            </div>
            <div class="form-group p-1">
              <label for="title">Title:</label>
              <input
                type="text"
                name="title"
                className="form-control"
                onChange={AddTitle}
                placeholder="Enter Title"
              />
            </div>
            <div class="form-group p-1">
              <label for="description">Description:</label>
              <input
                type="text"
                name="description"
                className="form-control"
                onChange={AddDescription}
                placeholder="Enter Description"
              />
            </div>
            <div class="form-group p-1">
              <label for="image">Image:</label>
              <input
                type="file"
                name="image"
                className="form-control"
                onChange={AddImage}
                placeholder="Pick Image"
              />
            </div>
            <div class="form-group p-1">
              <label for="link">Link:</label>
              <input
                type="text"
                name="link"
                className="form-control"
                onChange={AddLink}
                placeholder="Link"
              />
            </div>
            <div class="form-group p-1">
              <button onClick={handleAddQuestion} className="btn btn-main mt-2">
                <i className="fab fa-plus"></i>Add problemStatement
              </button>
              {addQuestion}
            </div>
            <div class="form-group p-1">
              <label for="carrerLink">Career Link</label>
              <input
                type="text"
                name="carrerLink"
                className="form-control"
                onChange={AddCareerLink}
                placeholder="Career Link"
              />
            </div>
          </div>
          <div class=" d-flex justify-content-center">
            <button type="submit" class="btn btn-success">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCompany;
