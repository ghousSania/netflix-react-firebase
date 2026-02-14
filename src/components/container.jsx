const Container = ({ children, className = "" }) => {
  return (
    <div className={`max-w-325 mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
