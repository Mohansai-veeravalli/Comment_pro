import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  deleteComment as deleteCommentApi,
} from "../api";
import { useState, useEffect } from "react";
import Comment from "./Comment";

const Comments = ({ currentUserId,backendComments,deleteComment }) => {
  const [backendCommentss, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState()
  const rootComments = backendComments.filter(
    (backendComment) => 
    backendComment.parentId === null
  )
//   const typeComments = backendComments.filter(type=>{
// debugger;
//      type.RoleType 
//   });

  const getReplies = (commendId) => {
    return backendCommentss 
      .filter((backendComment) => backendComment.parentId === commendId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  };

  const addComment = (text, parentId,textType) => {
    createCommentApi(text, parentId,textType).then((comment) => {
      setBackendComments([comment, ...backendCommentss]);
    });
  };

  // const deleteComment = (commentId) => {
  //   if (window.confirm("are you sure")) {
  //     deleteCommentApi(commentId).then(() => {
  //       console.log(backendCommentss) 
  //       backendComments.forEach(function (backendComment) {
  //         if (backendComment.parentId === null && backendComment.id === commentId) {
  //           const updatedBackendCommentss = backendComments.filter(
  //             (backendComm) => backendComm.id !== commentId
  
  //           );
  //           console.log("commentDeleted in backendcomments")
  //           console.log(updatedBackendCommentss)
  //           console.log(backendComments)
  //           setBackendComments(updatedBackendCommentss)
  //         }
  //         else {
  //           const updatedBackendCommentss = backendCommentss.filter(
  //             (backendComm) => backendComm.id !== commentId
  
  //           );
  //           console.log("commentDeleted in backendCommentss")
  //           console.log(updatedBackendCommentss)
  //           console.log(backendComments)
  //           console.log(backendCommentss)
  //           setBackendComments(updatedBackendCommentss)
  //         }
  //     });      
        
  //     });
  //   }
  // };
  const replydelete = (commentId) => {
    if (window.confirm("are you sure")) {
      deleteCommentApi(commentId).then(() => {
        console.log(backendComments)
        const updatedBackendCommentss = backendCommentss.filter(
          (backendComment) => backendComment.id !== commentId 
        );
        console.log("commentDeleted")
        console.log(updatedBackendCommentss)
        setBackendComments(updatedBackendCommentss)
        
      });
    }
  };

  useEffect(() => {
    if(backendCommentss.length===0){
      getCommentsApi().then((data) => {
        let newComment = JSON.parse(localStorage.getItem('commentList')) 
        if(newComment===null){
          setBackendComments(data);
        }else{
          setBackendComments(newComment);
        }
      });
    }else{
      localStorage.setItem('commentList',JSON.stringify(backendCommentss))
    }
  }, [backendCommentss]);
  return (
    <div className="comments">
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            currentUserId={currentUserId}
            deleteComment={deleteComment}
            replydelete = {replydelete}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            textType={rootComment.RoleType}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
