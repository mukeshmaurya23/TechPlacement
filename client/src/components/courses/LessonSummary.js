import { Link } from "react-router-dom";
import styles from "./LessonSummary.module.css";
import React, { useEffect, useState } from "react";
// const Section = ({ courseId, lesson, description }) => {
//   const [isVisible, setIsVisible] = useState(false);

//   return (
//     <>
//       <div class={styles.accordionItemBody}>
//         <div class={styles.accordionItembodyContent}>
//           <div className={`card-body p-3 ${styles.centerContent}`}>
//             <div class="row" style={{ width: "maxContent" }}>
//               <div class="col">
//                 <p>
//                   <Link
//                     className="no-underline cursor-pointer"
//                     style={{ textDecoration: "none", color: "#000" }}
//                     to={"/courses/" + courseId + "/lessons/" + lesson}
//                   >
//                     {isVisible && description}
//                   </Link>
//                 </p>

//                 {isVisible ? (
//                   <button
//                     className="btn btn-primary"
//                     onClick={() => setIsVisible(false)}
//                   >
//                     Hide
//                   </button>
//                 ) : (
//                   <button
//                     className="btn btn-primary"
//                     onClick={() => setIsVisible(true)}
//                   >
//                     <Link
//                       className="no-underline cursor-pointer"
//                       style={{ textDecoration: "none", color: "#fff" }}
//                       to={"/courses/" + courseId + "/lessons/" + lesson}
//                     >
//                       Start Lesson
//                     </Link>
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
function LessonSummary(props) {
  //make a function to expnd and collapse the lesson summary
  const [isVisible, setIsVisible] = useState(false);

  return (
    <section key={props.lesson._id}>
      <div class={styles.accordion}>
        <div class={styles.accordionItem}>
          <div class={styles.accordionItemHeader}>
            <Link
              className="no-underline cursor-pointer p-2"
              style={{ textDecoration: "none", color: "#000" }}
              to={"/courses/" + props.courseId + "/lessons/" + props.lesson._id}
            >
              {props.num}. {props.lesson.title}
            </Link>
            {isVisible ? (
              <button
                className="btn btn-outline-success"
                onClick={() => setIsVisible(false)}
              >
                Hide
              </button>
            ) : (
              <button
                className="btn btn-outline-success"
                onClick={() => setIsVisible(true)}
              >
                Show
              </button>
            )}
          </div>

          {isVisible && (
            <>
              <div style={{ margin: "1.5rem" }}>
                <span
                  style={{
                    fontSize: "14px",
                  }}
                >
                  {props.lesson.description}
                </span>
                <div>
                  <button
                    className="btn btn-success"
                    style={{
                      marginTop: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <Link
                      className="no-underline cursor-pointer"
                      style={{ textDecoration: "none", color: "#fff" }}
                      to={
                        "/courses/" +
                        props.courseId +
                        "/lessons/" +
                        props.lesson._id
                      }
                    >
                      Start Lesson
                    </Link>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default LessonSummary;
/*

  {expand ? (
            <div class={styles.accordionItemBody}>
              <div class={styles.accordionItembodyContent}>
                <div className={`card-body p-3 ${styles.centerContent}`}>
                  <div class="row" style={{ width: "maxContent" }}>
                    <div class="col">
                      <p>
                        <Link
                          className="no-underline cursor-pointer"
                          style={{ textDecoration: "none", color: "#000" }}
                          to={
                            "/courses/" +
                            props.courseId +
                            "/lessons/" +
                            props.lesson._id
                          }
                        >
                          {props.lesson.description}
                        </Link>
                      </p>
                      <button className="btn btn-primary">
                        <Link
                          className="no-underline cursor-pointer"
                          style={{ textDecoration: "none", color: "#fff" }}
                          to={
                            "/courses/" +
                            props.courseId +
                            "/lessons/" +
                            props.lesson._id
                          }
                        >
                          Start Lesson
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
_____________
 <div>
        <div className="title ">
          <h2>
            <Link
              className="no-underline cursor-pointer p-2"
              style={{ textDecoration: "none", color: "#000" }}
              to={"/courses/" + props.courseId + "/lessons/" + props.lesson.id}
            >
              {props.num}. {props.lesson.title}
            </Link>
          </h2>
        </div>
        <p>
          <Link
            className="no-underline cursor-pointer"
            style={{ textDecoration: "none", color: "#000" }}
            to={"/courses/" + props.courseId + "/lessons/" + props.lesson.id}
          >
            {props.lesson.description}
          </Link>
        </p>
      </div>
*/
