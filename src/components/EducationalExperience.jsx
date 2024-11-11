import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function EducationForm() {
  const [currentEntry, setCurrentEntry] = useState({
    id: "",
    schoolName: "",
    studyName: "",
    dateStart: "",
    dateEnd: "",
  });
  const [educationData, setEducationData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentEntry({
      ...currentEntry,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateInput = () => {
    const newErrors = {};

    if (!currentEntry.schoolName.trim()) {
      newErrors.schoolName = "School name is required";
    }
    if (!currentEntry.studyName.trim()) {
      newErrors.studyName = "Study name is required";
    }
    if (!currentEntry.dateStart.trim()) {
      newErrors.dateStart = "Start date is required";
    }
    if (!currentEntry.dateEnd.trim()) {
      newErrors.dateEnd = "End date is required";
    }

    if (currentEntry.dateStart && currentEntry.dateEnd) {
      const startDate = new Date(currentEntry.dateStart);
      const endDate = new Date(currentEntry.dateEnd);

      if (endDate < startDate) {
        newErrors.dateEnd = "End date cannot be earlier than start date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveEntry = () => {
    if (!validateInput()) {
      return;
    }

    if (currentEntry.id) {
      const updatedData = educationData.some(
        (entry) => entry.id === currentEntry.id
      )
        ? educationData.map((entry) =>
            entry.id === currentEntry.id ? currentEntry : entry
          )
        : [...educationData, currentEntry];

      setEducationData(updatedData);
      setIsEditing(false);
      setCurrentEntry({
        id: "",
        schoolName: "",
        studyName: "",
        dateStart: "",
        dateEnd: "",
      });
    }
  };

  const handleAddNewEntry = () => {
    setCurrentEntry({
      id: uuidv4(),
      schoolName: "",
      studyName: "",
      dateStart: "",
      dateEnd: "",
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    const isEmpty =
      !currentEntry.schoolName.trim() &&
      !currentEntry.studyName.trim() &&
      !currentEntry.dateStart.trim() &&
      !currentEntry.dateEnd.trim();

    if (isEmpty) {
      setIsEditing(false);
      setCurrentEntry({
        id: "",
        schoolName: "",
        studyName: "",
        dateStart: "",
        dateEnd: "",
      });
    } else {
      alert("Cannot exit: Form has unsaved data. Please clear fields or save.");
    }
  };

  const handleEditEntry = (id) => {
    const entryToEdit = educationData.find((entry) => entry.id === id);
    setCurrentEntry(entryToEdit);
    setIsEditing(true);
  };

  const handleDeleteEntry = (id) => {
    const updatedData = educationData.filter((entry) => entry.id !== id);
    setEducationData(updatedData);
  };

  return (
    <div>
      <h2>Educational Information</h2>
      <button onClick={handleAddNewEntry}> + Education</button>

      {isEditing && (
        <div>
          <h3>{currentEntry.id ? "Edit Entry" : "Add New Entry"}</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <label>School Name:</label>
              <input
                type="text"
                name="schoolName"
                value={currentEntry.schoolName}
                onChange={handleInputChange}
              />
              {errors.schoolName && (
                <p style={{ color: "red" }}>{errors.schoolName}</p>
              )}
            </div>

            <div>
              <label>Study Name:</label>
              <input
                type="text"
                name="studyName"
                value={currentEntry.studyName}
                onChange={handleInputChange}
              />
              {errors.studyName && (
                <p style={{ color: "red" }}>{errors.studyName}</p>
              )}
            </div>

            <div>
              <label>Start Date:</label>
              <input
                type="date"
                name="dateStart"
                value={currentEntry.dateStart}
                onChange={handleInputChange}
              />
              {errors.dateStart && (
                <p style={{ color: "red" }}>{errors.dateStart}</p>
              )}
            </div>

            <div>
              <label>End Date:</label>
              <input
                type="date"
                name="dateEnd"
                value={currentEntry.dateEnd}
                onChange={handleInputChange}
              />
              {errors.dateEnd && (
                <p style={{ color: "red" }}>{errors.dateEnd}</p>
              )}
            </div>

            <button type="button" onClick={handleSaveEntry}>
              Save Entry
            </button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        </div>
      )}

      <h3>Educational Entries:</h3>
      {educationData.length > 0 ? (
        <ul>
          {educationData.map((entry) => (
            <li key={entry.id}>
              <p>
                <strong>School:</strong> {entry.schoolName} <br />
                <strong>Study:</strong> {entry.studyName} <br />
                <strong>Start Date:</strong> {entry.dateStart} <br />
                <strong>End Date:</strong> {entry.dateEnd}
              </p>
              <button onClick={() => handleEditEntry(entry.id)}>Edit</button>
              <button onClick={() => handleDeleteEntry(entry.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No educational entries added yet.</p>
      )}
    </div>
  );
}

export default EducationForm;
