const AuthLayout = ({ title, subTitle, children }) => {
  return (
    <div className="flex justify-center items-center bg-(--bg) min-h-screen ">
      <div className=" w-full max-w-95 ">
        <h2 className="text-center text-(--text-primary) font-bold text-2xl">
          {title}
        </h2>
        <p className="text-center text-(--text-muted) mt-3 mb-5">{subTitle}</p>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
