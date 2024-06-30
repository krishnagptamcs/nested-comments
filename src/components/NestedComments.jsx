import React, { useState } from "react";
import "./style.css";
import useCommentTree from "../hooks/user-comment-tree";
import Comment from "./Comment";

const NestedComments = ({
  comments,
  onSubmit = () => {},
  onEdit = () => {},
  onDeleted = () => {},
}) => {
  const [comment, setComment] = useState("");
  const { comments: commentData, insertComment } = useCommentTree(comments);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleReply = (commentId, content) => {
    // to add a reply in the comment ,
    //pass with comment id and content
    insertComment(commentId, content);
    onSubmit(content);
  };

  const handelSubmit = () => {
    if (comment) {
      // so to add a new commnet , simply pass the content
      handleReply(undefined, comment);
      setComment("");
    }
  };
  return (
    <>
      <div className="add-comment">
        <textarea
          value={comment}
          onChange={handleChange}
          rows={3}
          cols={50}
          className="comment-textarea"
          placeholder="Add a  new comment"
        />
        <button className="comment-button" onClick={handelSubmit}>
          Add comment
        </button>
      </div>

      {/* rendering the comments */}

      {commentData?.map((item) => (
        <Comment key={item.id} comment={item} onSubmitComment={handleReply} />
      ))}
    </>
  );
};

export default NestedComments;
