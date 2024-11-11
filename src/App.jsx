import { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
import FormSection from "./components/FormSection";
import "./App.scss";

import {
  personalInfoConfig,
  educationConfig,
  workExperienceConfig,
} from "./components/formConfig";

const App = () => {
  const [personalData, setPersonalData] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [workExperienceData, setWorkExperienceData] = useState([]);

  return (
    <div>
      <FormSection
        title="Personal Information"
        config={personalInfoConfig}
        data={personalData}
        setData={setPersonalData}
        isSingleEntry
      />
      <FormSection
        title="Education"
        config={educationConfig}
        data={educationData}
        setData={setEducationData}
      />
      <FormSection
        title="Work Experience"
        config={workExperienceConfig}
        data={workExperienceData}
        setData={setWorkExperienceData}
      />
    </div>
  );
};

export default App;
