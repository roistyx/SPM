import React, { useState } from "react";
import "./PersonalPathologyForm.css"; // Import the CSS for styling

function PersonalPathologyForm() {
  const [formUserData, setformUserData] = useState({
    name: "",
    lastName: "",
    dateOfBirth: "",
    address: "",
    phone: "",
    diagnosis: "",
    primaryReason: "",
    referringPhysician: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formUserData);
    // Here you would typically handle the submission to a server
  };

  return (
    <div className="personal-information-container">
      <span className="title-personal-information">Personal Information</span>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="section personal-information">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formUserData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formUserData.lastName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="dateOfBirth"
            placeholder="Date of Birth"
            value={formUserData.dob}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formUserData.address}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formUserData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="section consultation-details">
          <div className="consultation-method">
            <h3 className="title">Consultation Method</h3>
            <div className="radio-buttons">
              <label>
                <input
                  type="radio"
                  name="consultationMethod"
                  value="Phone Call"
                  onChange={handleChange}
                />{" "}
                Phone Call
              </label>
              <label>
                <input
                  type="radio"
                  name="consultationMethod"
                  value="Facetime"
                  onChange={handleChange}
                />{" "}
                Facetime
              </label>
              <label>
                <input
                  type="radio"
                  name="consultationMethod"
                  value="Zoom"
                  onChange={handleChange}
                />{" "}
                Zoom
              </label>
            </div>
          </div>
          <input
            type="text"
            name="diagnosis"
            placeholder="Diagnosis"
            value={formUserData.diagnosis}
            onChange={handleChange}
          />
          <input
            type="text"
            name="primaryReason"
            placeholder="Primary Reason"
            value={formUserData.primaryReason}
            onChange={handleChange}
          />
          <input
            type="text"
            name="referringPhysician"
            placeholder="Referring Physician"
            value={formUserData.referringPhysician}
            onChange={handleChange}
          />
          <button type="button" onClick={handleEditAppointment}>
            Back
          </button>
          <button type="submit">Next</button>
        </div>
      </form>
    </div>
  );
}

export default PersonalPathologyForm;
