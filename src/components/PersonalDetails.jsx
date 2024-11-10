import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function PersonalDetails() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phonenumber: '',
        address: '',
      });
      const [submittedData, setSubmittedData] = useState(null);
      const [errors, setErrors] = useState({});
      const [isSubmitted, setIsSubmitted] = useState(false);
    
      const validateInput = () => {
        const newErrors = {};
    
        if (!formData.firstname.trim()) {
          newErrors.firstname = 'First name is required';
        }
        if (!formData.lastname.trim()) {
          newErrors.lastname = 'Last name is required';
        }
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
          newErrors.email = 'Invalid email format';
        }
        if (!formData.phonenumber.trim()) {
          newErrors.phonenumber = 'Phone number is required';
        } else if (!/^\d{8}$/.test(formData.phonenumber)) {
          newErrors.phonenumber = 'Phone number must be 10 digits';
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
          <h2>Personal information</h2>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="firstname">First Name:</label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                />
                {errors.firstname && <p style={{ color: 'red' }}>{errors.firstname}</p>}
              </div>
    
              <div>
                <label htmlFor="lastname">Last Name:</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                />
                {errors.lastname && <p style={{ color: 'red' }}>{errors.lastname}</p>}
              </div>
    
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  autoComplete="email"
                  onChange={handleInputChange}
                />
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
              </div>
    
              <div>
                <label htmlFor="phonenumber">Phone Number:</label>
                <input
                  type="text"
                  id="phonenumber"
                  name="phonenumber"
                  value={formData.phonenumber}
                  onChange={handleInputChange}
                />
                {errors.phonenumber && <p style={{ color: 'red' }}>{errors.phonenumber}</p>}
              </div>
    
              <div>
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  autoComplete="street-address"
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
                <strong>Name:</strong> {submittedData.firstname} {submittedData.lastname}
              </p>
              <p>
                <strong>Email:</strong> {submittedData.email}
              </p>
              <p>
                <strong>Phone:</strong> {submittedData.phonenumber}
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