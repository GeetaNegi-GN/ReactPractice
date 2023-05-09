import React, { useState } from "react";
 import NoteContext from "./noteContext"; 

 const NoteState = (props) => {
 const notesIntial = [
    {
      "_id": "64594846d706ecbe9a6b1b87",
      "user": "64592985c46a0a305a733d62",
      "title": "my title",
      "description": "please write something",
      "tag": "personal",
      "date": "2023-05-08T19:06:46.059Z",
      "__v": 0
    },
    {
        "_id": "64594846d706ecbe9a6b1b8",
        "user": "64592985c46a0a305a733d62",
        "title": "my title",
        "description": "please write something",
        "tag": "personal",
        "date": "2023-05-08T19:06:46.059Z",
        "__v": 0
      },
      {
        "_id": "64594846d706ecbe9a6b1b871",
        "user": "64592985c46a0a305a733d62",
        "title": "my title",
        "description": "please write something",
        "tag": "personal",
        "date": "2023-05-08T19:06:46.059Z",
        "__v": 0
      },
      {
        "_id": "64594846d706ecbe9a6b1b872",
        "user": "64592985c46a0a305a733d62",
        "title": "my title",
        "description": "please write something",
        "tag": "personal",
        "date": "2023-05-08T19:06:46.059Z",
        "__v": 0
      },
      {
        "_id": "64594846d706ecbe9a6b1b873",
        "user": "64592985c46a0a305a733d62",
        "title": "my title",
        "description": "please write something",
        "tag": "personal",
        "date": "2023-05-08T19:06:46.059Z",
        "__v": 0
      },
  ]
  const [ notes,setNotes] = useState(notesIntial)
  

    return (
        <NoteContext.Provider value = {{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

 }


 export default NoteState;