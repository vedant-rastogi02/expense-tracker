import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {getuser} from "../../utils/getuser";


const AuthRoute = ({ children }) => {
    const token = getuser();

  if (token) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AuthRoute;
