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
    "inline-flex items-center justify-center gap-2 rounded-md  py-2 cursor-pointer font-medium transition focus: outline-none  ";

  const width = fullWidth ? "w-full" : "";

  const isDisabled = disabled || loading;
  const variants = {
    primary: `
            px-3 sm:px-4
            py-3
            text-sm sm:text-base
            bg-(--primary)
            text-white
            hover:bg-(--primary)/90
            active:bg-(--primary)/80
            `,
    link: `px-1 text-(--link)`,
    light: `
             px-3 sm:px-4
             py-3
            text-sm sm:text-base
            bg-white/20
            text-white
            hover:bg-white/30
            backdrop-blur
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
