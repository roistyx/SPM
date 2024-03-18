import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Confirmation() {
  const currentFormData = useSelector((state) => state.stepper.currentFormData);
  const currentAppointmentData = useSelector(
    (state) => state.stepper.currentAppointmentData
  );
  console.log("currentFormData", currentFormData);
  console.log("currentAppointmentData", currentAppointmentData);

  return (
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
      <p>Date: {currentAppointmentData.date}</p>
      <p>Time: {currentAppointmentData.time}</p>
    </div>
  );
}
