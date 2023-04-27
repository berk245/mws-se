import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { editNotebookName } from "../utils";
import EditNotebookForm from "./EditNotebookForm";
function ListItem({ content, reload }) {
  const [editItem, setEditItem] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const [newNotebookName, setNewNotebookName] = useState(content.NotebookName);

  const navigate = useNavigate();

  if (editItem)
    return (
      <EditNotebookForm content={content} reload={reload} />
    );
  else {
    return (
      <div className="notebook-info-line"  onClick={() => navigate(`/notebook/${content.NotebookID}`)}>
        <span>{content.NotebookName}</span>
        <span className="helper-text">
          (Click to see details/edit/delete)
        </span>
      </div>
    );
  }
}

export default ListItem;
