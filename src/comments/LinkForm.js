import { useState } from "react";

const LinkForm = ({ handleSubmit, submitLabel }) => {
  const [text, setText] = useState("");
  const TextType = "URL"
  const textDisabled = text.length === 0
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text,null,TextType);
    setText("")
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="comment-form-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="comment-form-button" disabled={textDisabled} >{submitLabel}</button>
    </form>

  );
};

export default LinkForm;
