
export const Button = ({
  children,
  type = "button",
  className = "",
  ...props
}) => (
  <button type={type} className={`btn ${className}`} {...props}>
    {children}
  </button>
);
