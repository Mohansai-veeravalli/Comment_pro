import CommentForm from "./CommentForm";
import React, { useState } from "react";
import { AiFillLike } from "react-icons/ai";

const Comment = ({
  comment,
  replies,
  currentUserId,
  deleteComment,
  replydelete,
  activeComment,
  addComment,
  setActiveComment,
  parentId = null,
  textType,
}) => {
  const minutes = 60000 * 10;
  const timePassed = new Date() - new Date(comment.createdAt) > minutes;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId && !timePassed;
  const canDelete = currentUserId === comment.userId && comment.parentId === null && !timePassed;
  const replyCanDelete = currentUserId === comment.userId && comment.parentId !==null;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  const isRelying =
    activeComment &&
    activeComment.type === "replying" &&
    activeComment.id === comment.id;
  // const isEditing =
  //   activeComment &&
  //   activeComment.type === "editing" &&
  //   activeComment.id === comment.id;
  const replyId = parentId ? parentId : comment.id;
  // const [link, setLink] = useState(comment.body);
  const [count, setCount] = useState(0);
  return (
    <div className="comment">
      <div className="comment-image-container">
        <img src="/user-icon.png" alt=""/>
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.username}</div>
          <div>{createdAt}</div>
        </div>
        <div className="comment-text">
          {textType === "plainText" || undefined ? (
            comment.body
          ) : textType === "URL" ? (
            <a href={comment.body} rel="noopener noreferrer">
              {comment.body}
            </a>
          ) : (
            <img className="PostedImage" src={comment.body} alt="" />
          )}
        </div>
        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              Reply
            </div>
          )}
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "editing" })
              }
            >
              <button
                onClick={() => setCount(count + 1)}
                className="like-button"
              >
                {" "}
                <AiFillLike /> {count}
              </button>
            </div>
          )}
          
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment.id)}
            >
              Delete
            </div>
          )}
          {replyCanDelete && (
            <div
              className="comment-action"
              onClick={() => replydelete(comment.id)}
            >
              Delete
            </div>
          )}
        </div>
        {isRelying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                replies={[]}
                currentUserId={currentUserId}
                deleteComment={deleteComment}
                replydelete = {replydelete}
                addComment={addComment}
                parentId={comment.id}
                textType={"plainText"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
