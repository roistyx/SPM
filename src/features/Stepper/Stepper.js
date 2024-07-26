import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentStep } from './stepperSlice'; // adjust the import path as necessary
import NewCalendar from '../../components/NewCalendar/NewCalendar';
import PersonalPathologyForm from '../../components/Appointment/PersonalPathologyForm';
import Confirmation from '../../components/Appointment/SubmitUserAppointment';
import ThankYou from '../../components/Appointment/ThankYou';
import './Stepper.css';

const steps = [
  {
    counter: '1',
    title: 'Date and Time',
    content: <NewCalendar />,
  },
  {
    counter: '2',
    title: 'Personal Information',
    content: <PersonalPathologyForm />,
  },
  {
    counter: '3',
    title: 'Confirmation',
    content: <Confirmation />,
  },
  {
    counter: '4',
    title: 'Thank you',
    content: <ThankYou />,
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
      <div className="content-container">
        <div
          onClick={() => handleStepChange(currentStep + 1)}
          className="step-counter"
        >
          <div className="title">{steps[currentStep - 1].title}</div>
          <div>
            Step {currentStep}/{steps.length}
          </div>
        </div>
        <div>{steps[currentStep - 1].content}</div>
      </div>
    </div>
  );
};

export default Stepper;
