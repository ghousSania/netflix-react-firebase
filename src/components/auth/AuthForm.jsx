import React from "react";

const AuthForm = ({ onSubmit, children }) => {
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="bg-slate-800/70 backdrop-blur-md py-5 px-7 shadow-2xl rounded-xl"
    >
      {children}
    </form>
  );
};

export default AuthForm;
