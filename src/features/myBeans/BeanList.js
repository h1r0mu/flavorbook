import BeanListItem from "./BeanListItem";
import React from "react";
import { selectBeanIds } from "./beansSlice";
import { useSelector } from "react-redux";

const BeanList = () => {
  const beanIds = useSelector(selectBeanIds);

  const renderedListItems = beanIds.map((beanId) => {
    return <BeanListItem key={beanId} id={beanId} />;
  });

  const loadingStatus = useSelector((state) => state.beans.status);

  if (loadingStatus === "loading") {
    return (
      <div>
        <div className="loader" />
      </div>
    );
  }

  return <ul className="bean-list">{renderedListItems}</ul>;
};

export default BeanList;
