import React, { useContext, useState, useEffect } from "react";
import "./Comment.css";
import { AuthContext } from "../components/store/auth-login";
const Comment = () => {
  const user = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const commentFormHandler = (e) => {
    e.preventDefault();
    console.log(comment);
    setComments([...comments, comment]);
    setComment("");
  };
  // useEffect(() => {
  //   setLoading(true);
  //   fetch("/api/comments")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setComments(data);
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <>
      <div class="container mt-5 p-5 align-items-center justify-content-center d-flex mw-100">
        <div class="row bootstrap snippets bootdeys">
          <div class="col-sm-12">
            <div class="comment-wrapper">
              <div class="panel panel-info">
                <div
                  class="panel-heading text-center"
                  style={{
                    backgroundColor: "rgba(40, 167, 69)",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "20px",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  Comment panel
                </div>
                <div class="panel-body" style={{ padding: "1rem" }}>
                  <form onSubmit={commentFormHandler}>
                    <textarea
                      class="form-control"
                      placeholder="write a comment..."
                      rows="3"
                      onChange={(e) => setComment(e.target.value)}
                      value={comment}
                    ></textarea>

                    <br />
                    <button className="btn btn-success">Post</button>
                  </form>
                  <div class="clearfix"></div>
                  <hr />
                  <ul class="media-list">
                    <li class="media">
                      <a href="#" class="pull-left">
                        <img
                          src="https://bootdey.com/img/Content/user_1.jpg"
                          alt=""
                          class="img-circle"
                        />
                      </a>
                      <div class="media-body">
                        <span class="text-muted pull-right">
                          <small class="text-muted">30 min ago</small>
                        </span>
                        <strong class="text-success">@MartinoMont</strong>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Lorem ipsum dolor sit amet,{" "}
                          <a href="#">#consecteturadipiscing </a>.
                        </p>
                      </div>
                    </li>
                    <li class="media">
                      <a href="#" class="pull-left">
                        <img
                          src="https://bootdey.com/img/Content/user_2.jpg"
                          alt=""
                          class="img-circle"
                        />
                      </a>
                      <div class="media-body">
                        <span class="text-muted pull-right">
                          <small class="text-muted">30 min ago</small>
                        </span>
                        <strong class="text-success">@LaurenceCorreil</strong>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Lorem ipsum dolor <a href="#">#ipsumdolor </a>
                          adipiscing elit.
                        </p>
                      </div>
                    </li>
                    <li class="media">
                      <a href="#" class="pull-left">
                        <img
                          src="https://bootdey.com/img/Content/user_3.jpg"
                          alt=""
                          class="img-circle"
                        />
                      </a>
                      <div class="media-body">
                        <span class="text-muted pull-right">
                          <small class="text-muted">30 min ago</small>
                        </span>
                        <strong class="text-success">@JohnNida</strong>
                        <p>
                          Lorem ipsum dolor <a href="#">#sitamet</a> sit amet,
                          consectetur adipiscing elit.
                        </p>
                        {comments.map((comment) => (
                          <p>{comment}</p>
                        ))}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
