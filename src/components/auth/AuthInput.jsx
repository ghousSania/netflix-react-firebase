const AuthInput = ({
  label,
  type = "text",
  id,
  name,
  value,
  onChange,
  required = false,
  placeholder = "",
  className = "",
}) => {
  return (
    <div>
      <label className="text-slate-300 font-medium" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        placeholder={placeholder}
        className={`bg-(--input-bg) border border-(--input-border)  transition-all duration-200 ease-in-out w-full px-3 py-2 text-(--text-primary) placeholder:text-(--input-placeholder) rounded-md  mt-3 focus:border-(--input-border-focus) focus: outline-none ${className} `}
      />
    </div>
  );
};

export default AuthInput;
