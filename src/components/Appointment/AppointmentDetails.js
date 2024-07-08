import React from 'react';
import './AppointmentDetails.css';

const AppointmentDetails = ({
  currentFormData,
  handleEditAppointment,
  handleSubmitAppointment,
}) => {
  return (
    <div>
      <div className="columns-container" style={{ display: 'flex' }}>
        <div className="left-container" style={{ flex: 1 }}>
          <div className="detail-box">
            <span className="title-data">Name </span>
            <span className="form-data">
              {currentFormData.firstName} {currentFormData.lastName}
            </span>
            <span className="title-data">Date of Birth </span>
            <span className="form-data">{currentFormData.dob}</span>
            <span className="title-data">Address </span>
            <span className="form-data">
              {currentFormData.address}
            </span>
            <span className="title-data">Phone </span>
            <span className="form-data">{currentFormData.phone}</span>
            <span className="title-data">Email </span>
            <span className="form-data">{currentFormData.email}</span>
          </div>
        </div>

        {/* Vertical line */}
        <div
          className="vertical-line"
          style={{
            borderLeft: '1px solid #000',
            height: '100%',
            margin: '0 20px',
          }}
        ></div>

        <div className="right-container" style={{ flex: 1 }}>
          <div className="detail-box">
            <span className="title-data">Consultation Method </span>
            <span className="form-data">
              {currentFormData.consultationMethod}
            </span>
            <span className="title-data">Diagnosis </span>
            <span className="form-data">
              {currentFormData.diagnosis}
            </span>
            <span className="title-data">Primary Reason </span>
            <span className="form-data">
              {currentFormData.primaryReason}
            </span>
            <span className="title-data">Referring Physician </span>
            <span className="form-data">
              {currentFormData.referringPhysician}
            </span>
          </div>
          <div className="submission-or-buttons">
            <button type="button" onClick={handleEditAppointment}>
              Back
            </button>
            <button type="submit" onClick={handleSubmitAppointment}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
