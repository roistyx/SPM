import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentStep } from "./stepperSlice"; // adjust the import path as necessary
import Calendar from "../../components/Calendar/Calendar";
import PersonalPathologyForm from "../../components/Appointment/PersonalPathologyForm";
import Confirmation from "../../components/Appointment/Confirmation";

const steps = [
  { label: "Choose Appointment", content: <Calendar /> },
  { label: "Your Info", content: <PersonalPathologyForm /> },
  { label: "Confirmation", content: <Confirmation /> },
];

const Stepper = () => {
  const currentStep = useSelector((state) => state.stepper.currentStep);
  const dispatch = useDispatch();

  const handleStepChange = (step) => {
    dispatch(setCurrentStep(step));
  };

  return (
    <div>
      <div>
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => handleStepChange(index + 1)}
            disabled={currentStep === index + 1}>
            {step.label}
          </button>
        ))}
      </div>
      <div>{steps[currentStep - 1].content}</div>
    </div>
  );
};

export default Stepper;
