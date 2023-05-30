import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
//import detailData from "../Data/detailData.json";
import DetailCard from "../../UI/DetailCard";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import Spinner from "../../UI/Spinner";
//import data from "../Data/data.json";
import Modal from "../../UI/Modal";

import useFetch from "../../hooks/useFetch";
import Shimmer from "../../resumeFunction/Resume/ShimmerResume";
import { HOME_DATA } from "../../constant";
const DetailsAboutCompany = () => {
  const [isModal, setModal] = useState(false);
  const [selectedQuestionNumber, setselectedQuestionNumber] = useState("");
  const [selectedQuestion, setselectedQuestion] = useState("");
  // const [foundUser, setFoundUser] = useState([]);
  // const [loading, setLoading] = useState(false);

  const { data: foundUser, loading, error } = useFetch(HOME_DATA);
  const openModal = (e) => {
    setModal(true);
    setselectedQuestionNumber(e.target.id);

    for (var i = 0; i < foundUser.length; i++) {
      if (foundUser[i].id === e.target.name.split(" ")[0]) {
        let question =
          foundUser[i].problemStatement[e.target.name.split(" ")[1] - 1]
            .description;

        setselectedQuestion(question);
      }
    }
  };

  const modalHandler = () => {
    setModal(false);
  };

  const params = useParams();
  console.log("mukesh", params.id);
  const location = useLocation();
  console.log(location.pathname);
  //let content = detailData.find((item) => item.link === params.id);
  const style = {
    "@media screen and (maxWidth: 700px)": {
      marginLeft: "4rem",
    },
  };
  return (
    <>
      {/* {onUpdate={() => window.scrollTo(0, 0)}} */}
      {/* //paste it in div below */}

      <div
        style={{
          marginTop: "100px",
        }}
      >
        {!loading &&
          foundUser.map((detail) => {
            if (detail.id === params.id) {
              console.log(detail);

              return (
                <DetailCard
                  key={detail.id}
                  title={detail.title}
                  // image={createImageLink(detail.image)}
                  image={detail.image}
                  description={detail.description}
                  carrerLink={detail.carrerLink}
                />
              );
            }
            return null;
          })}
        <span style={{ marginTop: "10rem" }}> {loading && <Shimmer />}</span>
        <span style={{ marginTop: "10rem" }}> {error && <h1>{error}</h1>}</span>
        <div className="container">
          {isModal && (
            <Modal closing={modalHandler}>
              <>
                <pre
                  className="p-2"
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  {selectedQuestion}
                </pre>
              </>
            </Modal>
          )}
          <div className="row pt-5 p-2">
            <h3>Frequently Asked Question</h3>

            <div className=" pt-4">
              <div className="bg-success pt-3 text-white">
                <div className="row">
                  <div className="col-8">
                    <h5 className="p-3 pb-3" style={style}>
                      Problem Title
                    </h5>
                  </div>
                  <div className="col-2">
                    <h5 className="pt-3 pb-3">Topic</h5>
                  </div>
                </div>
              </div>

              {!loading &&
                foundUser.map((item) => {
                  if (item.id === params.id) {
                    return (
                      <div key={item.id}>
                        {item.problemStatement.map((problem) => (
                          <table className="table" key={problem.id}>
                            <tbody>
                              <tr>
                                <td style={{ width: "40%" }}>{problem.q1}</td>
                                <td style={{ width: "24%" }}>
                                  {problem.topic}
                                </td>

                                <td style={{ width: "18%" }}>
                                  <Link
                                    to={`${location.pathname}/${problem._id}/compiler`}
                                  >
                                    <button className="btn btn-success">
                                      Solve
                                    </button>
                                  </Link>
                                </td>
                                <td style={{ width: "18%" }}>
                                  <button
                                    className="btn btn-success"
                                    type="submit"
                                    id={problem.id}
                                    name={`${item.id} ${problem.id}`}
                                    onClick={openModal}
                                  >
                                    View
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        ))}
                      </div>
                    );
                  }
                  return null;
                })}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default React.memo(DetailsAboutCompany);
