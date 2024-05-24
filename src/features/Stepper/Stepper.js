import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentStep } from './stepperSlice'; // adjust the import path as necessary
import NewCalendar from '../../components/NewCalendar/NewCalendar';
import PersonalPathologyForm from '../../components/Appointment/PersonalPathologyForm';
import Confirmation from '../../components/Appointment/Confirmation';
import './Stepper.css';

const steps = [
  {
    counter: '1',
    label: 'Choose Appointment',
    content: <NewCalendar />,
  },
  {
    counter: '2',
    label: 'Your Info',
    content: <PersonalPathologyForm />,
  },
  {
    counter: '3',
    label: 'Confirmation',
    content: <Confirmation />,
  },
];

const Stepper = () => {
  const currentStep = useSelector(
    (state) => state.stepper.currentStep
  );
  const dispatch = useDispatch();

  const handleStepChange = (step) => {
    dispatch(setCurrentStep(step));
  };

  return (
    <div className="stepper-container">
      <div className="step-counter">
        Step {currentStep}/{steps.length}
      </div>
      <div>{steps[currentStep - 1].content}</div>
    </div>
  );
};

export default Stepper;
