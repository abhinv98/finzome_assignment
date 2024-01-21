import React, { useState, useEffect } from "react";

const EditModal = ({ data, onSave, onClose }) => {
  const [formData, setFormData] = useState({ ...data });

  useEffect(() => {
    setFormData({ ...data });
  }, [data]);

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
    } else if (type === "radio") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-container">
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Contact:
        <input
          type="tel"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          pattern="[0-9]{10}"
          required
        />
        
      </label>
      <label>
        Weekday:
        <div className="checkbox-group">
          {Object.keys(formData.weekdays).map((day) => (
            <label key={day} className="checkbox-label">
              <input
                type="checkbox"
                name={day}
                checked={formData.weekdays[day]}
                onChange={handleChange}
              />
              {day.substring(0, 3)}
            </label>
          ))}
        </div>
      </label>
      <label>
        Gender:
        <div className="radio-group">
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
      </label>
      <label>
        Date of Birth:
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
      </label>
      <div className="button-group">
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditModal;
