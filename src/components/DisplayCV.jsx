export const PersonalInfoDisplay = ({ data, onEdit }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
      <h3>Personal Information</h3>
      {data.length > 0 ? (
        <>
          <p>
            <strong>First Name:</strong> {data[0].firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {data[0].lastName}
          </p>
          <p>
            <strong>Email:</strong> {data[0].email}
          </p>
          <p>
            <strong>Phone:</strong> {data[0].phone}
          </p>
          <p>
            <strong>Address:</strong> {data[0].address}
          </p>
          <button onClick={() => onEdit(data[0].id)}>Edit</button>
        </>
      ) : (
        <p>No personal information submitted yet.</p>
      )}
    </div>
  );
};

export const EducationDisplay = ({ data, onEdit, onDelete }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
      <h3>Education</h3>
      {data.length > 0 ? (
        data.map((entry) => (
          <div key={entry.id} style={{ marginBottom: "10px" }}>
            <p>
              <strong>School Name:</strong> {entry.schoolName}
            </p>
            <p>
              <strong>Study Program:</strong> {entry.studyProgram}
            </p>
            <p>
              <strong>Start Date:</strong> {entry.dateStart}
            </p>
            <p>
              <strong>End Date:</strong> {entry.dateEnd}
            </p>
            <button onClick={() => onEdit(entry.id)}>Edit</button>
            <button onClick={() => onDelete(entry.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No education entries submitted yet.</p>
      )}
    </div>
  );
};

export const WorkExperienceDisplay = ({ data, onEdit, onDelete }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
      <h3>Work Experience</h3>
      {data.length > 0 ? (
        data.map((entry) => (
          <div key={entry.id} style={{ marginBottom: "10px" }}>
            <p>
              <strong>Employer:</strong> {entry.employer}
            </p>
            <p>
              <strong>Position:</strong> {entry.position}
            </p>
            <p>
              <strong>Description:</strong> {entry.description}
            </p>
            <p>
              <strong>Start Date:</strong> {entry.dateStart}
            </p>
            <p>
              <strong>End Date:</strong> {entry.dateEnd}
            </p>
            <button onClick={() => onEdit(entry.id)}>Edit</button>
            <button onClick={() => onDelete(entry.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No work experience entries submitted yet.</p>
      )}
    </div>
  );
};
