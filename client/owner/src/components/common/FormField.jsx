

 const FormField = ({ label, name, type, register, error }) =>
 (
  <div className="form-control">
    <label className="label">
      <span className="label-text">{label}</span>
    </label>
    <input
      type={type}
      placeholder={name}
      className="input input-bordered "
      {...register(name)}
    />
    {error && <span className="text-error text-xs">{error.message}</span>}
  </div>
);



export default FormField;
