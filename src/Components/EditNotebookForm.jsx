import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import {editNotebookName} from '../utils'

function EditNotebookForm({ content, reload,  close}) {
  const [editItem, setEditItem] = useState(false);
  const [fetchingData, setFetchingData] = useState(false)
  const [newNotebookName, setNewNotebookName] = useState(content.NotebookName)

  const navigate = useNavigate()

  const submitUpdate = async() => {
    try{
        setFetchingData(true)
        let updateSuccess = await editNotebookName({notebookId: content.NotebookID, newNotebookName: newNotebookName})
        if(updateSuccess) reload()
        else{
            alert('Something went wrong with the update. Please try again.')
        }
    }catch(err){
        alert('Something went wrong with the update. Please try again.')
    }finally{
        setFetchingData(false)
        setEditItem(false)
        setNewNotebookName('')
        close()
    }

  }
    return (
      <div className="add-new-word-form">
        <p>Edit Notebook</p>
        <div className="label-input-pair">

        </div>
        <input className="number-input" onChange={(e)=>{setNewNotebookName(e.target.value)}} defaultValue={content.NotebookName}></input>
        <div className="edit-notebook-form-buttons">
          <button className='btn form-submit-button go-back-button' onClick={submitUpdate} disabled={fetchingData}>Submit</button>
          <button className='btn form-submit-button go-back-button danger-button' onClick={close}>Cancel</button>
        </div >
      </div>
    );

}

export default EditNotebookForm;
