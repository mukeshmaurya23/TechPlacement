import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../components/store/auth-login";
import axios from "axios";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
import { POST_COMMENTS } from "../../constant";

function Comments(props) {
  const [Comment, setComment] = useState("");
  const [state] = useContext(AuthContext);
  // console.log(state.user);
  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      content: Comment,
      writer: state.user ? state.user.firstName : "Anonymous",
    };
    if (Comment === "") {
      toast.error("Please write something");
      return;
    }

    axios.post(POST_COMMENTS, variables).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        toast.success("Comment Submitted");
        setComment("");
        props.refreshFunction(res.data.result);
      } else {
        window.location.reload();
      }
    });
  };

  return (
    <div>
      {/* <p
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        Companies Review and Discussion Forum
      </p> */}
      <span
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        Top Comments({props.CommentLists.length})
      </span>
      <br />
      <hr />
      {/* Root Comment Form */}
      <form
        style={{ display: "flex", width: "100%", maxWidth: "100%" }}
        onSubmit={onSubmit}
      >
        <textarea
          onChange={handleChange}
          value={Comment}
          placeholder="write some comments"
          className="form-control p-2"
        />
        <br />
        <button
          className=""
          style={{
            width: "20%",
            height: "62px",
            backgroundColor: "#0D6EFD",
            color: "white",
            border: "none",
            marginLeft: "10px",
            borderRadius: "5px",
          }}
        >
          Submit
        </button>
      </form>
      {props.CommentLists &&
        props.CommentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment>
                <SingleComment
                  comment={comment}
                  key={index}
                  refreshFunction={props.refreshFunction}
                />
                <ReplyComment
                  CommentLists={props.CommentLists}
                  parentCommentId={comment._id}
                  refreshFunction={props.refreshFunction}
                />
              </React.Fragment>
            )
        )}
    </div>
  );
}

export default Comments;
