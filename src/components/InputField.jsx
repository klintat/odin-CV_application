const InputField = ({
  label,
  name,
  value,
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
        onChange={onChange}
        rows="4"
        cols="50"
      />
    ) : (
      <input type={type} name={name} value={value} onChange={onChange} />
    )}
  </div>
);

export default InputField;
