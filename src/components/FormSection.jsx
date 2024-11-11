import InputField from "./InputField";

function FormSections({
  formData,
  formConfig,
  handleChange,
  handleSubmit,
  handleCancel,
  errors,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {formConfig.map((field) => (
        <InputField
          key={field.name}
          label={field.label}
          name={field.name}
          type={field.type}
          value={formData[field.name] || ""}
          onChange={handleChange}
          error={errors[field.name]}
        />
      ))}
      <button type="submit"></button>
      <button type="button" onClick={handleCancel}></button>
    </form>
  );
}

export default FormSections;
