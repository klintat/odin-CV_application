import { useState } from 'react';
import InputField from './InputField';

const FormSection = ({ sectionTitle, fields, onAddEntry }) => {
  const [formData, setFormData] = useState(
    Object.fromEntries(fields.map((field) => [field.name, '']))
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate: Ensure no empty values
    if (Object.values(formData).some((value) => value.trim() === '')) return;
    onAddEntry(formData);
    // Reset form data after submission
    setFormData(Object.fromEntries(fields.map((field) => [field.name, ''])));
  };

  return (
    <div>
      <h3>{sectionTitle}</h3>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <InputField
            key={field.name}
            label={field.label}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            type={field.type}
            isTextArea={field.isTextArea}
          />
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormSection;
