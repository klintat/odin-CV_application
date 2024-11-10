import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function PersonalDetails() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
      });
      const [submittedData, setSubmittedData] = useState(null);
      const [errors, setErrors] = useState({});
      const [isSubmitted, setIsSubmitted] = useState(false);
    
      const validateInput = () => {
        const newErrors = {};
    
        if (!formData.firstName.trim()) {
          newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = 'Last name is required';
        }
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
          newErrors.email = 'Invalid email format';
        }
        if (!formData.phoneNumber.trim()) {
          newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^\d{8}$/.test(formData.phoneNumber)) {
          newErrors.phoneNumber = 'Phone number must be 10 digits';
        }
        if (!formData.address.trim()) {
          newErrors.address = 'Address is required';
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        if (validateInput()) {
          const newEntry = { id: uuidv4(), ...formData };
          setSubmittedData(newEntry);
          setIsSubmitted(true);
          setErrors({});
        }
      };
    
      const handleEdit = () => {
        setIsSubmitted(false);
      };
    
      return (
        <div>
          <h2>User Information Form</h2>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <div>
                <label>First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
              </div>
    
              <div>
                <label>Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
              </div>
    
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
              </div>
    
              <div>
                <label>Phone Number:</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
                {errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber}</p>}
              </div>
    
              <div>
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
                {errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}
              </div>
    
              <button type="submit">Submit</button>
            </form>
          ) : (
            <div>
              <h3>Submitted Data:</h3>
              <p>
                <strong>Name:</strong> {submittedData.firstName} {submittedData.lastName}
              </p>
              <p>
                <strong>Email:</strong> {submittedData.email}
              </p>
              <p>
                <strong>Phone:</strong> {submittedData.phoneNumber}
              </p>
              <p>
                <strong>Address:</strong> {submittedData.address}
              </p>
              <button onClick={handleEdit}>Edit</button>
            </div>
          )}
        </div>
      );
}

export default PersonalDetails;