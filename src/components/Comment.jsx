import { useState } from "react";

const Comment = ({ comment, onSubmitComment = () => {} }) => {
  const [replyContent, setReplyContent] = useState("");
  const [expand, setExpand] = useState(false);

  const handleChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handelReplySubmit = () => {
    if (replyContent) {
      onSubmitComment(comment.id, replyContent);
      setReplyContent("");
    }
  };
  const toggleExpand = () => {
    setExpand(!expand);
  };
  const toggleEditMode = () => {
    setExpand(!expand);
  };
  return (
    <div className="comment">
      <>
        <p className="comment-content">{comment.content}</p>
        <p className="comment-info">Votes: {comment.votes}</p>
        <p className="comment-info">
          {new Date(comment.timestamp).toLocaleString()}
        </p>
      </>

      <div className="comment-actions">
        <button onClick={toggleExpand} className="comment-button">
          {expand ? "Hide Replies" : "Reply"}
        </button>
        <button onClick={toggleEditMode} className="comment-button">
          Edit
        </button>
        <button
          onClick={() => onDeleteComment(comment.id)}
          className="comment-button"
        >
          Delete
        </button>
      </div>

      {expand && (
        <>
          <div className="comment-replies">
            <div className="add-comment">
              <textarea
                value={replyContent}
                onChange={handleChange}
                rows={3}
                cols={50}
                className="comment-textarea"
                placeholder="Add a  new comment"
              />
              <button className="comment-button" onClick={handelReplySubmit}>
                Add comment
              </button>
            </div>

            {comment?.replies?.map((reply) => {
              return (
                <Comment
                  comment={reply}
                  key={reply.id}
                  onSubmitComment={onSubmitComment}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Comment;
