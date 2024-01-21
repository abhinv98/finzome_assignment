// Form.js
import React, { useState } from "react";

const Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    weekdays: {
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
    },
    gender: "",
    dob: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        weekdays: {
          ...prevData.weekdays,
          [name]: checked,
        },
      }));
    } else if (name === "contact") {
      
      const sanitizedValue = value.replace(/\D/g, ""); 
      const truncatedValue = sanitizedValue.slice(0, 10); 
      setFormData((prevData) => ({
        ...prevData,
        [name]: truncatedValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: "",
      email: "",
      contact: "",
      weekdays: {
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
      },
      gender: "",
      dob: "",
    });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="contact">Contact:</label>
        <input
          type="tel"
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          pattern="[0-9]{10}"
          required
        />
      </div>
      <div className="form-group">
        <label>Weekdays:</label>
        <div className="checkbox-group">
          {Object.keys(formData.weekdays).map((day) => (
            <label key={day} className="checkbox-label">
              <input
                type="checkbox"
                name={day}
                checked={formData.weekdays[day]}
                onChange={handleChange}
              />
              {day.substring(0, 3)} {/* Display first 3 letters */}
            </label>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label>Gender:</label>
        <label className="radio-label">
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={formData.gender === "Male"}
            onChange={handleChange}
          />
          Male
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={formData.gender === "Female"}
            onChange={handleChange}
          />
          Female
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
