import { useState } from "react";
import InputField from "./InputField";
import { v4 as uuidv4 } from "uuid";
import {
  PersonalInfoDisplay,
  EducationDisplay,
  WorkExperienceDisplay,
} from "./DisplayCV";

const FormSection = ({
  title,
  config,
  data,
  setData,
  isSingleEntry = false,
}) => {
  const [currentEntry, setCurrentEntry] = useState(
    config.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEntry({
      ...currentEntry,
      [name]: value,
    });
  };

  const validateInput = (entry) => {
    const newErrors = {};
    config.forEach((field) => {
      if (!entry[field.name]?.trim()) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateInput(currentEntry)) return;

    if (isSingleEntry) {
      setData([{ ...currentEntry, id: uuidv4() }]);
    } else if (editingId) {
      setData(
        data.map((entry) =>
          entry.id === editingId ? { ...currentEntry, id: editingId } : entry
        )
      );
    } else {
      setData([...data, { ...currentEntry, id: uuidv4() }]);
    }

    resetForm();
  };

  const handleEdit = (id) => {
    const entry = data.find((item) => item.id === id);
    setCurrentEntry(entry);
    setEditingId(id);
  };

  const handleDelete = (id) => {
    setData(data.filter((entry) => entry.id !== id));
  };

  const resetForm = () => {
    setCurrentEntry(
      config.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
    );
    setEditingId(null);
    setErrors({});
  };

  return (
    <div>
      <h2>{title}</h2>
      {title === "Personal Information" && (
        <PersonalInfoDisplay data={data} onEdit={handleEdit} />
      )}
      {title === "Education" && (
        <EducationDisplay
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      {title === "Work Experience" && (
        <WorkExperienceDisplay
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <h3>{editingId ? "Edit Entry" : "Add New Entry"}</h3>
      {config.map((field) => (
        <div key={field.name} style={{ marginBottom: "10px" }}>
          <InputField
            label={field.label}
            name={field.name}
            value={currentEntry[field.name]}
            onChange={handleChange}
            type={field.type}
          />
          {errors[field.name] && (
            <p style={{ color: "red", margin: "5px 0" }}>
              {errors[field.name]}
            </p>
          )}
        </div>
      ))}
      <button onClick={handleSubmit}>{editingId ? "Save" : "Submit"}</button>
    </div>
  );
};

export default FormSection;
