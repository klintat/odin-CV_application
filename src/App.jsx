import "./App.css";
import PersonalDetails from "./components/PersonalDetails.jsx";
import EducationalExperience from "./components/EducationalExperience.jsx";
import WorkExperience from "./components/WorkExperience.jsx";

function App() {
  return (
    <>
      <div>
        <h1>CV application</h1>
        <PersonalDetails />
        <EducationalExperience />
        <WorkExperience />
      </div>
    </>
  );
}

export default App;
