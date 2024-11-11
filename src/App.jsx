import { useState } from "react";
import FormSection from "./components/FormSection";
import DisplayCV from "./components/DisplayCV";
import {
  personalFields,
  educationFields,
  workFields,
} from "./components/formConfig";
import "./App.scss";

const App = () => {
  const [personalInfo, setPersonalInfo] = useState([]);
  const [educationEntries, setEducationEntries] = useState([]);
  const [workEntries, setWorkEntries] = useState([]);

  const handleAddPersonalInfo = (entry) => {
    setPersonalInfo([entry]);
  };

  const handleAddEducation = (entry) => {
    setEducationEntries((prevEntries) => [...prevEntries, entry]);
  };

  const handleAddWork = (entry) => {
    setWorkEntries((prevEntries) => [...prevEntries, entry]);
  };

  const handleEditEntry = (setEntries, index, updatedEntry) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry, i) => (i === index ? updatedEntry : entry))
    );
  };

  const handleDeleteEntry = (setEntries, index) => {
    setEntries((prevEntries) => prevEntries.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h3 className="tittle">CV Application</h3>
      <div id="appContainer">
        <div id="InputFieldContainer">
          <FormSection
            sectionTitle="Personal Information"
            fields={personalFields}
            onAddEntry={handleAddPersonalInfo}
          />

          <FormSection
            sectionTitle="Education"
            fields={educationFields}
            onAddEntry={handleAddEducation}
          />

          <FormSection
            sectionTitle="Work Experience"
            fields={workFields}
            onAddEntry={handleAddWork}
          />
        </div>
        <div id="entrieDisplayContainer">
          <DisplayCV
            entries={personalInfo}
            sectionTitle="Personal Information"
            onEditEntry={(index, updatedEntry) =>
              handleEditEntry(setPersonalInfo, index, updatedEntry)
            }
            onDeleteEntry={(index) => handleDeleteEntry(setPersonalInfo, index)}
            fields={personalFields}
          />

          <DisplayCV
            entries={educationEntries}
            sectionTitle="Education"
            onEditEntry={(index, updatedEntry) =>
              handleEditEntry(setEducationEntries, index, updatedEntry)
            }
            onDeleteEntry={(index) =>
              handleDeleteEntry(setEducationEntries, index)
            }
            fields={educationFields}
          />

          <DisplayCV
            entries={workEntries}
            sectionTitle="Work Experience"
            onEditEntry={(index, updatedEntry) =>
              handleEditEntry(setWorkEntries, index, updatedEntry)
            }
            onDeleteEntry={(index) => handleDeleteEntry(setWorkEntries, index)}
            fields={workFields}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
