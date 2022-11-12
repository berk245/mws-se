import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import {editNotebookName} from '../utils'
import EditNotebookForm from './EditNotebookForm'
function ListItem({ content, userId, reload }) {
  const [editItem, setEditItem] = useState(false);
  const [fetchingData, setFetchingData] = useState(false)
  const [newNotebookName, setNewNotebookName] = useState(content.NotebookName)

  const navigate = useNavigate()

  const submitUpdate = async() => {
    try{
        setFetchingData(true)
        let updateSuccess = await editNotebookName({userId: userId, notebookId: content.NotebookID, newNotebookName: newNotebookName})
        if(updateSuccess){

        }else{
            alert('Something went wrong with the update. Please try again.')
        }
    }catch(err){
        alert('Something went wrong with the update. Please try again.')
        console.log(err)
    }finally{
        setFetchingData(false)
        setEditItem(false)
        setNewNotebookName('')
        reload()
    }

  }
  if (editItem) return <EditNotebookForm content={content} reload={reload} userId={userId}/>
  else {
    return (
      <div className="list-item">
        <span>{content.NotebookName}</span>
        <span>
        <button onClick={()=>navigate(`/notebook/${content.NotebookID}`)} disabled={fetchingData}> > </button>
        </span>
      </div>
    );
  }
}

export default ListItem;
