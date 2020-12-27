import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const NotLoginOnly = () => {
  const { data } = useSelector((state) => state.auth);
  return <>{data?.access_token && <Redirect to="/" />}</>;
};

export default NotLoginOnly;
