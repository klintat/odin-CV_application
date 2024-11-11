import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function WorkExperience() {
  const [currentEntry, setCurrentEntry] = useState({
    id: "",
    companyName: "",
    position: "",
    responsibilities: "",
    dateStart: "",
    dateEnd: "",
  });
  const [workData, setWorkData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChanges = (event) => {
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

    if (!currentEntry.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }
    if (!currentEntry.position.trim()) {
      newErrors.studyName = "Position name is required";
    }
    if (!currentEntry.responsibilities.trim()) {
      newErrors.responsibilities = "Atleast one responsibilitie is required";
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
      const updatedData = workData.some((entry) => entry.id === currentEntry.id)
        ? workData.map((entry) =>
            entry.id === currentEntry.id ? currentEntry : entry
          )
        : [...workData, currentEntry];

      setWorkData(updatedData);
      setIsEditing(false);
      setCurrentEntry({
        id: "",
        companyName: "",
        position: "",
        responsibilities: "",
        dateStart: "",
        dateEnd: "",
      });
    }
  };

  const handleAddNewEntry = () => {
    setCurrentEntry({
      id: uuidv4(),
      companyName: "",
      position: "",
      responsibilities: "",
      dateStart: "",
      dateEnd: "",
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    const isEmpty =
      !currentEntry.companyName.trim() &&
      !currentEntry.position.trim() &&
      !currentEntry.responsibilities.trim() &&
      !currentEntry.dateStart.trim() &&
      !currentEntry.dateEnd.trim();

    if (isEmpty) {
      setIsEditing(false);
      setCurrentEntry({
        id: "",
        companyName: "",
        position: "",
        responsibilities: "",
        dateStart: "",
        dateEnd: "",
      });
    } else {
      alert("Cannot exit: Form has unsaved data. Please clear fields or save.");
    }
  };

  const handleEditEntry = (id) => {
    const entryToEdit = workData.find((entry) => entry.id === id);
    setCurrentEntry(entryToEdit);
    setIsEditing(true);
  };

  const handleDeleteEntry = (id) => {
    const updatedData = workData.filter((entry) => entry.id !== id);
    setWorkData(updatedData);
  };

  return (
    <div>
      <h2>Work experience</h2>
      <button onClick={handleAddNewEntry}> + Experience</button>

      {isEditing && (
        <div>
          <h3>{currentEntry.id ? "Edit Entry" : "Add New Entry"}</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <label>Employer name:</label>
              <input
                type="text"
                name="companyName"
                value={currentEntry.companyName}
                onChange={handleChanges}
              />
              {errors.companyName && (
                <p style={{ color: "red" }}>{errors.companyName}</p>
              )}
            </div>

            <div>
              <label>Position:</label>
              <input
                type="text"
                name="position"
                value={currentEntry.position}
                onChange={handleChanges}
              />
              {errors.position && (
                <p style={{ color: "red" }}>{errors.position}</p>
              )}
            </div>

            <div>
              <label>Responsibilities:</label>
              <input
                type="text"
                name="responsibilities"
                value={currentEntry.responsibilities}
                onChange={handleChanges}
              />
              {errors.responsibilities && (
                <p style={{ color: "red" }}>{errors.responsibilities}</p>
              )}
            </div>

            <div>
              <label>Start Date:</label>
              <input
                type="date"
                name="dateStart"
                value={currentEntry.dateStart}
                onChange={handleChanges}
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
                onChange={handleChanges}
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

      <h3>Work experience:</h3>
      {workData.length > 0 ? (
        <ul>
          {workData.map((entry) => (
            <li key={entry.id}>
              <p>
                <strong>Employer:</strong> {entry.companyName} <br />
                <strong>Position:</strong> {entry.responsibilities} <br />
                <strong>Responsibilities:</strong> {entry.responsibilities}{" "}
                <br />
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
        <p>No work experience entries added yet.</p>
      )}
    </div>
  );
}

export default WorkExperience;
