const FormError = ({ message }) => {
  if (!message) return null;
  return (
    <div className=" flex items-start gap-3 mt-3 mb-3 rounded-xl border border-red-500/30 bg-slate-900/60 px-4 py-3 text-sm text-slate-200 backdrop-blur">
      <svg
        className="mt-0.5 h-5 w-5 shrink-0 text-red-400"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <p id="formErrorMessage" className="leading-relaxed">
        {message}
      </p>
    </div>
  );
};

export default FormError;
