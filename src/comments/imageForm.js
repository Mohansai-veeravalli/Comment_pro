import { useState } from "react";

const ImageForm = ({ handleSubmit, submitLabel }) => {
  const [text, setText] = useState("");
  const [Image,setImage] = useState(null);
  const imageDisabled = text.length === null
  const TextType = "Image"
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(Image,null,TextType);
    setText("")
  };

  
  return (
    <form onSubmit={onSubmit} className="form-image">
      <input type="file"
        name="file"
        onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
      />
      
      <div>
      <button className="comment-form-button" disabled={imageDisabled}>{submitLabel}</button>
      </div>
    </form>

  );
};

export default ImageForm;
