import { React } from "react";
import Form from "./Form";
import { useSelector } from "react-redux";

const Page = () => {
  const bean = useSelector((state) => state.bean);
  return <Form bean={bean} />;
};

export default Page;
