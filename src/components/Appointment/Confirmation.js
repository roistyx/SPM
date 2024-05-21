import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import QueryCalendar from "../../api/QueryCalendar";
import { setCurrentStep } from "../../features/Stepper/stepperSlice";
import AppointmentDateTitle from "./AppointmentDateTitle";

export default function Confirmation() {
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);
  const currentFormData = useSelector((state) => state.stepper.currentFormData);
  const selectedAppointmentObject = useSelector(
    (state) => state.stepper.selectedAppointment
  );
  console.log("selectedAppointment", selectedAppointmentObject);

  const step = useSelector((state) => state.stepper.currentStep);
  const dispatch = useDispatch();

  const handleSubmitAppointment = async (e) => {
    e.preventDefault();
    const response = await QueryCalendar.addAppointment({
      currentFormData,
      selectedAppointmentObject,
    });
    console.log("response", response);
    setAppointmentConfirmed(true);
  };

  const handleEditAppointment = () => {
    dispatch(setCurrentStep(step - 1));
  };

  return (
    <div className="confirmation-container">
      {!appointmentConfirmed ? (
        <>
          <AppointmentDateTitle selectedObj={selectedAppointmentObject} />
          <div>
            <h1>Confirmation</h1>
            <p>First Name: {currentFormData.firstName}</p>
            <p>Last Name: {currentFormData.lastName}</p>
            <p>Address: {currentFormData.address}</p>
            <p>Phone: {currentFormData.phone}</p>
            <p>Date of Birth: {currentFormData.dob}</p>
            <p>Email: {currentFormData.email}</p>
            <p>Consultation Method: {currentFormData.consultationMethod}</p>
            <p>Diagnosis: {currentFormData.diagnosis}</p>
            <p>Primary Reason: {currentFormData.primaryReason}</p>
            <p>Referring Physician: {currentFormData.referringPhysician}</p>
          </div>
          <div>
            <button onClick={handleEditAppointment}>Previous</button>
            <button onClick={handleSubmitAppointment}>Confirm</button>
          </div>
        </>
      ) : (
        <div>
          <h1>Appointment Confirmed</h1>
          <p>Thank you for confirming your appointment</p>
        </div>
      )}
    </div>
  );
}
