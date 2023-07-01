import { useEffect, useState } from "react";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  deleteComment as deleteCommentApi,
} from "../api";
import "../App.css";
import Comments from "../comments/Comments";
import CommentForm from "./CommentForm";
import ImageForm from "./imageForm";
import LinkForm from "./LinkForm";

const Tabs = () => {
  const [toggleState, setToggleState] = useState(1);
  const [backendComments, setBackendComments] = useState([]);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const addComment = (text, parentId,textType) => {
    createCommentApi(text, parentId, textType).then((comment) => {
      setBackendComments([comment, ...backendComments]);
    });
  };
  
  const deleteComment = (commentId) => {
    if (window.confirm("are you sure")) {
      deleteCommentApi(commentId).then(() => {
        console.log(backendComments)
        const updatedBackendCommentss = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
          
        );
        console.log("commentDeleted")
        console.log(updatedBackendCommentss)
        setBackendComments(updatedBackendCommentss)
        
      });
    }
  };

  useEffect(() => {
    if(backendComments.length===0){
      getCommentsApi().then((data) => {
        let newComment = JSON.parse(localStorage.getItem('commentList')) 
        if(newComment===null){
          setBackendComments(data);
        }else{
          setBackendComments(newComment);
        }
      });
    }else{
      localStorage.setItem('commentList',JSON.stringify(backendComments))
    }
  }, [backendComments]);

  return (
    <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Text
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Link
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          Image
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <h3 className="comments-title">Post</h3>
          <div className="comment-form-title">write something</div>
          <CommentForm submitLabel="post" handleSubmit={addComment} />
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h3 className="comments-title">Link</h3>
          <div className="comment-form-title">Add a link</div>
          <LinkForm submitLabel="post link" handleSubmit={addComment}/>
          

        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <h3 className="comments-title">Image</h3>
          <div className="comment-form-title">Add a Image</div>
          <ImageForm submitLabel="post" handleSubmit={addComment} />

        </div>
      </div>
      <Comments currentUserId="1" backendComments={backendComments} deleteComment={deleteComment}/>
    </div>
  );
};

export default Tabs;
