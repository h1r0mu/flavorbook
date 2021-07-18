import { React, useEffect } from "react";
import { useParams } from "react-router-dom";
import { selectBeanById } from "../myBeans/beansSlice";
import { useDispatch, useSelector } from "react-redux";
import Form from "./Form";
import { CircularProgress } from "@material-ui/core";
import { updateAll } from "./beanSlice";

const PageEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const bean = useSelector((state) => state.bean);
  const currentBean = useSelector((state) => selectBeanById(state, id));
  const loadingStatus = useSelector((state) => state.beans.status);

  if (loadingStatus === "loading") {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  useEffect(() => dispatch(updateAll(currentBean)), [currentBean]);

  return <Form bean={bean} />;
};

export default PageEdit;
