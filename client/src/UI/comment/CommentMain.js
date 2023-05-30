import React, { useState, useEffect } from "react";
import Comments from "./Comments";
import axios from "axios";
import { GET_COMMENTS } from "../../constant";
const CommentMain = () => {
  const [CommentLists, setCommentLists] = useState([]);

  useEffect(() => {
    axios
      .get(GET_COMMENTS)
      .then((res) => {
        setCommentLists(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  };
  return (
    <div
      className="container"
      style={{
        marginTop: "6rem",
        marginBottom: "6rem",
      }}
    >
      <Comments CommentLists={CommentLists} refreshFunction={updateComment} />

      <hr />
      {/* Comment Lists  */}
      {console.log(CommentLists)}
    </div>
  );
};

export default CommentMain;
