import React from "react";
import ListItem from "./ListItem";
function NotebooksList({ userNotebooks, reload }) {
  if (!userNotebooks.length) return <p>You don't have any notebooks</p>;
  return (
    <div className="questions-box">
      {userNotebooks.map((notebook, idx) => {
        return (
          <ListItem
            key={idx}
            reload={reload}
            content={notebook}
          />
        );
      })}
    </div>
  );
}

export default NotebooksList;
