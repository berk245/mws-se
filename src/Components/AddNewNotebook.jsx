import React, { useState } from "react";
import {createNotebook} from '../utils'

function AddNewNotebook({ close }) {
  const [newNotebookName, setNewNotebookName] = useState("");
  const addNewNotebook = async() => {
    let createSuccess = await createNotebook({newNotebookName})
    if(createSuccess) {
      close()
    }else{
      alert('Something went wrong while creating a new notebook.')
    }
  }

return(
        <div className="add-new-word-form">
          <div className="form-title"> Add New Notebook</div>
          <input
            onChange={(e) => setNewNotebookName(e.target.value)}
            type="text"
            name="notebook-name"
            id="notebook-name"
            className="number-input"
            placeholder="Notebook Name"
          />
          <button className="btn go-back-button form-submit-button" onClick={() => addNewNotebook()}>
            Submit
          </button>
          <button className="btn go-back-button" onClick={close}>Cancel</button>
        </div>
      )
    }



export default AddNewNotebook;
