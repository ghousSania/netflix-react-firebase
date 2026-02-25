const EmptyState = ({ icon, title, description, className = "" }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center px-6 py-20 ${className}`}
    >
      {icon && <div className=" mb-6 text-blue-500 opacity-90">{icon}</div>}

      {title && (
        <h2 className="text-2xl font-semibold text-white mb-3">{title}</h2>
      )}

      {description && (
        <p className="text-slate-400 max-w-md leading-relaxed">{description}</p>
      )}
    </div>
  );
};

export default EmptyState;
