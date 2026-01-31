import { ImSpinner2 } from "react-icons/im";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  loading = false,
  fullWidth = false,
  className = "",
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 font-medium transition focus: outline-none  ";

  const width = fullWidth ? "w-full" : "";

  const isDisabled = disabled || loading;
  const variants = {
    primary: `
            bg-(--primary)
            text-white
            cursor-pointer
            hover:bg-(--primary)/90
            active:bg-(--primary)/80
            `,
  };
  const disablesStyles = "opacity-60 cursor-not-allowed pointer-events-none";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={[
        base,
        width,
        variants[variant],
        isDisabled && disablesStyles,
        className,
      ].join(" ")}
    >
      {loading ? <ImSpinner2 className="h-6 w-5 animate-spin" /> : children}
    </button>
  );
};

export default Button;
