import React, { useState } from "react";

export default function TextForm(props) {
  const handleUpClick = () => {
    //console.log("Uppercase was clicked" + text);
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to uppercase","success");
  };
  const handleLoClick = () => {
   
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to lowercase","success");
  };
  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handleCopy = ()=>{
    var text = document.getElementById("myBox")
    text.select();
    navigator.clipboard.writeText(text.value);
    props.showAlert("Copyied to clipboard","success");
  }

  const [text, setText] = useState("");

  return (
    <>
      <div className="container" style={{color:props.mode==='dark'?'white':'#042743'}}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="myBox"
            value={text}
            onChange={handleOnChange}
            style={{ backgroundColor: props.mode==='dark'?'grey':'white'
             , color:props.mode==='dark'?'white':'#042743'}}
            rows="8"
          ></textarea>
        </div>

        <button className="btn btn-primary mx-1" onClick={handleUpClick}>
          Convert to UPPERCASE
        </button>
        <button className="btn btn-primary mx-1 " onClick={handleLoClick}>
          Convert to lowercase
        </button>
        <button className="btn btn-primary mx-1 " onClick={handleCopy}>
          Copy to Clipboard
        </button>
      </div>
      <div className="container my-3" style={{color:props.mode==='dark'?'white':'#042743'}}>
        <h2>Your text summary</h2>
        <p>
          {text.split(" ").length-1} words and {text.length} characters
        </p>
        <p>{0.008 *text.split(" ").length} Minutes read</p>
        <h2>Preview</h2>
        <p>{text.length>0?text:"Please enter something in the textbox to preview it here"}</p>
      </div>
    </>
  );
}
