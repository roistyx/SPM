import { createSlice } from '@reduxjs/toolkit';
import { set } from 'lodash';

export const stepperSlice = createSlice({
  name: 'stepper',
  initialState: {
    currentStep: 1,
    currentFormData: {},
    currentAppointmentData: {},
    calendarAvailability: {},
    selectedAppointment: {},
    currentDatePickerValue: {},
    confirmationData: {},
  },
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setFormData: (state, action) => {
      state.currentFormData = action.payload;
    },
    setAppointmentData: (state, action) => {
      state.currentAppointmentData = action.payload;
      // console.log("currentAppointmentData", state.currentAppointmentData);
    },
    setCalendarAvailability: (state, action) => {
      state.calendarAvailability = action.payload;
      // console.log(
      //   'monthAvailAppointments',
      //   state.monthAvailAppointments
      // );
    },
    setSetSelectedAppointment: (state, action) => {
      state.selectedAppointment = action.payload;
    },
    setCurrentDatePickerValue: (state, action) => {
      state.currentDatePickerValue = action.payload;
    },
    setErrorMessage: (state, action) => {
      const { field, message } = action.payload;
      state.errors[field] = message;
    },
    setConfirmationData: (state, action) => {
      state.confirmationData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCurrentStep,
  // currentFormData,
  setConfirmationData,
  setFormData,
  setAppointmentData,
  setCalendarAvailability,
  setSetSelectedAppointment,
  setCurrentDatePickerValue,
} = stepperSlice.actions;

export default stepperSlice.reducer;
