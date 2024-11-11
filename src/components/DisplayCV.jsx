import { useState } from 'react';
import InputField from './InputField';

const DisplayCV = ({ entries, onEditEntry, onDeleteEntry, fields, sectionTitle }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedData(entries[index]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    onEditEntry(editingIndex, editedData);
    setEditingIndex(null);
    setEditedData({});
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditedData({});
  };

  return (
    <div>
      <h3>{sectionTitle}</h3>
      {entries.length === 0 ? (
        <p>No information provided.</p>
      ) : (
        <ul>
          {entries.map((entry, index) => (
            <li key={index}>
              {editingIndex === index ? (
                <div>
                  {fields.map((field) => (
                    <InputField
                      key={field.name}
                      label={field.label}
                      name={field.name}
                      value={editedData[field.name] || ''}
                      onChange={handleChange}
                      type={field.type}
                      isTextArea={field.isTextArea}
                    />
                  ))}
                  <button onClick={handleSave}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              ) : (
                <div className="entryContainer">
                  {Object.entries(entry).map(([key, value]) => (
                    <p key={key}>
                        {value} |
                    </p>
                  ))}
                  <button onClick={() => handleEditClick(index)}>Edit</button>
                  <button onClick={() => onDeleteEntry(index)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DisplayCV;
