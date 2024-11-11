function InputField({ label, name, type, value, onChange, error }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <label>
        {label}:
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          style={{ display: "block", marginTop: "5px" }}
        />
      </label>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default InputField;
