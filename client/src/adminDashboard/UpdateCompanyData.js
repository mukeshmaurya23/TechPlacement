import React, { useState, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { HOME_DATA, UPDATE_DATA } from "../constant";
const UpdateCompanyData = () => {
  const cId = useParams().cId;
  console.log("cId", cId);
  const [foundData, setFoundData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [addQuestion, setAddQuestion] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [problemStatement, setProblemStatement] = useState([]);
  const [addQuestion, setAddQuestion] = useState([]);
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

  //const AddDescription = (e) => {
  //   setDescription(e.target.value);
  // };
  // const AddImage = (e) => {
  //   setImage(e.target.value);
  // };

  const identifiedComapny = foundData.find((company) => company.id === cId);
  //console.log(identifiedComapny);
  // setTitle(identifiedComapny.title);
  // console.log("Title", title);
  // setDescription(identifiedComapny.description);
  // setImage(identifiedComapny.image);
  // setProblemStatement(identifiedComapny.problemStatement);

  //console.log("identifiedComapny", identifiedComapny);
  useEffect(() => {
    setLoading(true);
    axios
      .get(HOME_DATA)
      .then((res) => {
        setFoundData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // const handleAddQuestion = (e) => {
  //   e.preventDefault();
  //   //count of problem statement
  //   const count = addQuestion.length;
  //   // adding problem statement
  //   problemStatement.push({
  //     id: "",
  //     q1: "",
  //     topic: "",
  //     description: "",
  //   });
  //   console.log("setpf", count, problemStatement);
  //   setAddQuestion([
  //     ...addQuestion,

  //     <>
  //       <div className="p-3">
  //         <div class="form-group">
  //           <label>Id</label>
  //           <input
  //             type="text"
  //             class="form-control"
  //             placeholder="Enter id for problemStatement"
  //             name={`id${count}`}
  //             onChange={(e) => {
  //               // setPid((prevState) => {
  //               //   var val = e.target.value;
  //               //   return { ...prevState, [e.target.name]: val };
  //               // });
  //               setProblemStatement(
  //                 (prevState) => {
  //                   var val = e.target.value;

  //                   problemStatement[count].id = val;
  //                   return problemStatement;
  //                 },
  //                 () => {
  //                   console.log("setpff", count, problemStatement);
  //                 }
  //               );
  //             }}
  //           />
  //         </div>
  //         <div class="form-group">
  //           <label>Questions</label>
  //           <input
  //             type="text"
  //             class="form-control"
  //             placeholder="enter the question"
  //             name={`q1${count}`}
  //             onChange={(e) => {
  //               // setpQuestion((prevState) => {
  //               //   var val = e.target.value;
  //               //   return { ...prevState, [e.target.name]: val };
  //               // });
  //               setProblemStatement((prevState) => {
  //                 var val = e.target.value;
  //                 problemStatement[count].q1 = val;
  //                 return problemStatement;
  //               });
  //             }}
  //           />
  //         </div>
  //         <div class="form-group">
  //           <label>Topic</label>
  //           <input
  //             type="text"
  //             class="form-control"
  //             placeholder="Enter the topic"
  //             name={`topic${count}`}
  //             onChange={(e) => {
  //               // setpTopic((prevState) => {
  //               //   var val = e.target.value;
  //               //   return { ...prevState, [e.target.name]: val };
  //               // });
  //               setProblemStatement((prevState) => {
  //                 var val = e.target.value;
  //                 problemStatement[count].topic = val;
  //                 return problemStatement;
  //               });
  //             }}
  //           />
  //         </div>
  //         <div class="form-group">
  //           <label>Description</label>
  //           <textarea
  //             id="mytextarea"
  //             class="form-control"
  //             rows="3"
  //             placeholder="Enter the description of problemStatement"
  //             name={`description${count}`}
  //             onChange={(e) => {
  //               // setpDescription((prevState) => {
  //               //   var val = e.target.value;
  //               //   return { ...prevState, [e.target.name]: val };
  //               // });
  //               setProblemStatement((prevState) => {
  //                 var val = e.target.value;
  //                 problemStatement[count].description = val;
  //                 return problemStatement;
  //               });
  //             }}
  //           />
  //         </div>
  //       </div>
  //     </>,
  //   ]);
  // };

  const updateDataHandler = (e) => {
    e.preventDefault();
    const url = `${UPDATE_DATA}/${identifiedComapny._id}`;
    axios
      .put(url, {
        // title: title.title,
        // description: description.description,
        // image: image,
        problemStatement: problemStatement,
      })
      .then((res) => {
        console.log(res);

        toast.success("Data Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // if (!identifiedComapny) {
  //   return <div>Company not found</div>;
  // }
  // console.log("problem", identifiedComapny.problemStatement);

  return (
    <>
      <div class="card  w-100" style={{ marginTop: "5.3rem" }}>
        <h5 class="card-header">Update Data</h5>
        <div class="card-body align-items-center">
          <h5 class="card-title">{cId}</h5>
          <p class="card-text">
            <form onSubmit={updateDataHandler}>
              {loading && <div>Loading...</div>}

              {/* <div class="form-group p-1">
                <label for="title">Title:</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  onChange={(e) => setTitle({ title: e.target.value })}
                  defaultValue={identifiedComapny.title}
                />
              </div> */}
              {/* <div class="form-group p-1">
                <label for="description">Description:</label>
                <textarea
                  type="text"
                  name="description"
                  className="form-control"
                  onChange={(e) =>
                    setDescription({ description: e.target.value })
                  }
                  defaultValue={identifiedComapny.description}
                />
              </div>
              <div class="form-group p-1">
                <label for="image">Image Link:</label>
                <input
                  type="text"
                  className="form-control"
                  name="image"
                  onChange={AddImage}
                  defaultValue={identifiedComapny.image}
                />
              </div> */}
              {/* <div class="form-group p-1">
                <label for="problemStatement">Problem Statement:</label>
                <div class="form-group p-1">
                  <button
                    onClick={handleAddQuestion}
                    className="btn btn-main mt-2"
                  >
                    <i className="fab fa-plus"></i>Add problemStatement
                  </button>
                  {addQuestion}
                </div>{" "}
              </div> */}
              {/* {foundData.map((data, index) => {
                return (
                  <div key={index}>
                    <div
                      class="form-group
                      p-1"
                    >
                      <label for="title">Title:</label>
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        onChange={(e) => {
                          setTitle((prevState) => {
                            var val = e.target.value;
                            return { ...prevState, [e.target.name]: val };
                          });
                        }}
                        defaultValue={data.title}
                      />
                    </div>
                    <div
                      class="form-group
                      p-1"
                    >
                      <label for="description">Description:</label>
                      <textarea
                        type="text"
                        name="description"
                        className="form-control"
                        onChange={(e) => {
                          setDescription((prevState) => {
                            var val = e.target.value;
                            return { ...prevState, [e.target.name]: val };
                          });
                        }}
                        defaultValue={data.description}
                      />
                    </div>
                    <div
                      class="form-group
                      p-1"
                    >
                      <label for="topic">Problem Statement:</label>
                      <input
                        type="text"
                        name="topic"
                        className="form-control"
                        onChange={(e) => {
                          setTitle((prevState) => {
                            var val = e.target.value;
                            return { ...prevState, [e.target.name]: val };
                          });
                        }}
                        defaultValue={data.topic}
                      />
                    </div>
                    <div
                      class="form-group
                      p-1"
                    >
                      {data.problemStatement.map((problem, index) => {
                        return (
                          <div key={index}>
                            <div
                              class="form-group
                                p-1"
                            >
                              <label for="title">Title:</label>
                              <input
                                type="text"
                                name="title"
                                className="form-control"
                                onChange={(e) => {
                                  setTitle((prevState) => {
                                    var val = e.target.value;
                                    return {
                                      ...prevState,
                                      [e.target.name]: val,
                                    };
                                  });
                                }}
                                defaultValue={problem.topic}
                              />
                            </div>
                            <div
                              class="form-group
                                p-1"
                            >
                              <label for="description">Description:</label>
                              <textarea
                                type="text"
                                name="description"
                                className="form-control"
                                onChange={(e) => {
                                  setDescription((prevState) => {
                                    var val = e.target.value;
                                    return {
                                      ...prevState,
                                      [e.target.name]: val,
                                    };
                                  });
                                }}
                                defaultValue={problem.q1}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })} */}

              <div class="form-group p-1">
                <button
                  onClick={handleAddQuestion}
                  className="btn btn-main mt-2"
                >
                  <i className="fab fa-plus"></i>Add problemStatement
                </button>
                {addQuestion}
              </div>

              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </form>
          </p>
        </div>
      </div>
    </>
  );
};

export default UpdateCompanyData;
