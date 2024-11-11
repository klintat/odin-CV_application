import useState from "react";
import { v4 as uuidv4 } from "uuid";
import FormSection from "./components/FormSection";
import "./App.scss";

function App() {
  const [personalDetails, setPersonalDetails] = useState(null);
  const [educationData, setEducationData] = useState([]);
  const [workData, setWorkData] = useState([]);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [formType, setFormType] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const personalFormConfig = [
    { name: "firstName", label: "First Name ", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phoneNumber", label: "Phone Number", type: "tel" },
    { name: "address", label: "Address", type: "text" },
  ]

  const educationFormConfig = [
    { name: "schoolName", label: "School Name", type: "text" },
    { name: "studyName", label: "Study Name", type: "text" },
    { name: "dateStart", label: "Start Date", type: "date" },
    { name: "dateEnd", label: "End Date", type: "date" },
  ];
 
  const workFormConfig = [
    { name: "companyName", label: "Company Name", type: "text" },
    { name: "jobTitle", label: "Job Title", type: "text" },
    { name: "dateStart", label: "Start Date", type: "date" },
    { name: "dateEnd", label: "End Date", type: "date" },
  ];
}

export default App;
