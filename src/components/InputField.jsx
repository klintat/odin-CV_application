const InputField = ({
  label,
  name,
  value,
  className,
  onChange,
  type = "text",
  isTextArea = false,
}) => (
  <div>
    <label>{label}</label>
    {isTextArea ? (
      <textarea
        name={name}
        value={value}
        className={className}
        onChange={onChange}
        rows="4"
        cols="50"
      />
    ) : (
      <input type={type} name={name} className={className} value={value} onChange={onChange} />
    )}
  </div>
);

export default InputField;
