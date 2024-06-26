import React, { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserInfoAction } from "../store/actions/asyncAuthActions";

const Authenticated = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(getUserInfoAction());
  }, []);

  return null;
};

export default Authenticated;
