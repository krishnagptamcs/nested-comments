import { useState } from "react";

const useCommentTree = (initialComments) => {
  const [comments, setComments] = useState(initialComments);

  const insertNode = (tree, commentId, content) => {
    // tree is a whole comment array
    // we are taking each element of tree , that means each element
    return tree.map((comment) => {
      // if the id matches ,
      // that means the element which are finding to add the replies is found add , simply add to it

      if (comment.id === commentId) {
        // this case if of , replying on the main  comment
        return {
          ...comment,
          replies: [...comment.replies, content], // returnig the whole object , of comment ,
          // but modifiding the reply key with the new content
        };
      } else if (comment.replies && comment.replies.length > 0) {
        //this is the case where comment elem is not found (you doing reply of a reply commennt)  , so we have to tarversing its reply array
        // so this case is when , you doing reply of a reply commennt
        return {
          ...comment,
          replies: insertNode(comment.replies, commentId, content), // now here we will passign the reply array , of the main comment as a tree
          // to insert a reply content node , under the replies array
        };
      }

      return comment;
    });
  };

  const insertComment = (commentId, content) => {
    const newComment = {
      id: Date.now(), // a unique id will be cretaed ,
      content,
      votes: 0,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    if (commentId) {
      // if the comment content having the id ,
      //that means the comment is not first comment
      //so placed in the top order
      // this means the content  is a reply , coz it having the id

      setComments((prevComments) =>
        insertNode(prevComments, commentId, newComment)
      );
    } else {
      // if it contain the id , then it means it have to placed in some thing comment array list
      // it means the content  is a comment , to add new comment in exsisting array

      setComments((prevComment) => [newComment, ...prevComment]);
    }
  };

  return {
    //it will return an particualr fn
    comments,
    insertComment,
  };
};

export default useCommentTree;
