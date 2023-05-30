import React, { useState, useContext } from "react";
import { AuthContext } from "../../components/store/auth-login";
import Axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { POST_COMMENTS } from "../../constant";
const SingleComment = (props) => {
  const [state] = useContext(AuthContext);
  const [CommentValue, setCommentValue] = useState("");
  const [OpenReply, setOpenReply] = useState(false);

  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const openReply = () => {
    setOpenReply(!OpenReply);
  };
  //convert createdAt to proper date format
  const date = new Date(props.comment.createdAt);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const createdAt = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  const onSubmit = (e) => {
    e.preventDefault();
    //alert(props.comment._id);
    const variables = {
      writer: state.user ? state.user.firstName : "Anonymous",

      responseTo: props.comment._id,

      content: CommentValue,
    };

    Axios.post(POST_COMMENTS, variables).then((response) => {
      if (response.data.success) {
        console.log(response.data.result);

        setCommentValue("");
        setOpenReply(!OpenReply);
        props.refreshFunction(response.data.result);
        toast.success("Comment Submitted");
      } else {
        window.location.reload();
      }
    });
  };

  const actions = [
    <span onClick={openReply} key="comment-basic-reply-to">
      Reply to {props.comment.writer}
    </span>,
  ];
  return (
    <div>
      <section class="gradient-custom">
        <div class="container">
          <div class="row d-flex p-3">
            <div class="col-md-12 col-lg-10 col-xl-8">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <div class="d-flex flex-start">
                        <img
                          class="rounded-circle shadow-1-strong me-3"
                          src="https://toppng.com/uploads/preview/user-account-management-logo-user-icon-11562867145a56rus2zwu.png"
                          alt="avatar"
                          width="65"
                          height="65"
                        />
                        <div class="flex-grow-1 flex-shrink-1">
                          <div>
                            <div class="d-flex justify-content-between align-items-center">
                              <p class="mb-1">
                                {props.comment.writer}
                                <span class="small m-2">{createdAt}</span>
                              </p>
                              <Link to="#">
                                <i class="fas fa-reply fa-xs"></i>
                                <span class="small"> {actions}</span>
                              </Link>
                            </div>
                            <p class="small mb-0">{props.comment.content}</p>
                          </div>
                          {OpenReply && (
                            <form onSubmit={onSubmit}>
                              <textarea
                                style={{ width: "100%", borderRadius: "5px" }}
                                onChange={handleChange}
                                value={CommentValue}
                                className="form-control m-3"
                                placeholder="write some comments"
                              />

                              <button
                                className="btn btn-primary"
                                style={{
                                  marginLeft: "15px",
                                }}
                              >
                                Submit
                              </button>
                            </form>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <span style={{ marginLeft: "40px", color: "black" }}>
        {props.comment.writer}
      </span>
      <span style={{ marginLeft: "40px", color: "black" }}>
        {" "}
        {props.comment.content}{" "}
      </span>
      <span style={{ marginLeft: "40px", color: "black" }}>
        {" "}
        {props.comment.createdAt}{" "}
      </span>
    
      <br /> */}
    </div>
  );
};

export default SingleComment;
