const Button = ({ children, loading, className, ...props }) => {
  return (
    <button
      className={`btn ${className} relative`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="loading loading-spinner loading-md"></span>
        </span>
      ) : null}
      <span className={loading ? "invisible" : ""}>{children}</span>
    </button>
  );
};

export default Button;
