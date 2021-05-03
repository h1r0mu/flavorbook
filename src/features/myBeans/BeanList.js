import { React, useState } from "react";

import BeanListItem from "./BeanListItem";
import Button from "@material-ui/core/Button";
import { selectBeanIds } from "./beansSlice";
import { useSelector } from "react-redux";

const BeanList = () => {
  const beanIds = useSelector(selectBeanIds);
  const [editable, setEditable] = useState(false);

  const renderedListItems = beanIds.map((beanId) => {
    return <BeanListItem key={beanId} id={beanId} editable={editable} />;
  });

  const handleClick = () => {
    setEditable(!editable);
  };

  const loadingStatus = useSelector((state) => state.beans.status);

  const editButtonLabel = !editable ? "Edit" : "Done";

  if (loadingStatus === "loading") {
    return (
      <div>
        <div className="loader" />
      </div>
    );
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClick}>
        {editButtonLabel}
      </Button>
      <ul className="bean-list">{renderedListItems}</ul>
    </div>
  );
};

export default BeanList;
