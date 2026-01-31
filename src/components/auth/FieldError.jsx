import React from "react";

const FieldError = ({ message }) => {
  if (!message) return null;
  return <p className="text-sm text-red-500 mt-2">{message}</p>;
};

export default FieldError;
