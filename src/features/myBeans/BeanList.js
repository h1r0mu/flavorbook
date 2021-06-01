import { React, useState } from "react";

import BeanListItem from "./BeanListItem";
import { selectBeanIds } from "./beansSlice";
import { useSelector } from "react-redux";
import Chips from "./Chips";

const BeanList = () => {
  const beanIds = useSelector(selectBeanIds);
  console.log(beanIds);
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
      <Chips
        name={editButtonLabel}
        pattern="Edit"
        color="secondry"
        onClick={handleClick}
      />
      <ul className="bean-list">{renderedListItems}</ul>
    </div>
  );
};

export default BeanList;
