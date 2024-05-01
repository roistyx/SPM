import { createSlice } from "@reduxjs/toolkit";

export const stepperSlice = createSlice({
  name: "stepper",
  initialState: {
    currentStep: 1,
    currentFormData: {},
    currentAppointmentData: {},
    calendarAvailability: {},
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
    setErrorMessage: (state, action) => {
      const { field, message } = action.payload;
      state.errors[field] = message;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCurrentStep,
  currentFormData,
  setFormData,
  setAppointmentData,
  setCalendarAvailability,
  monthAvailAppointments,
} = stepperSlice.actions;

export default stepperSlice.reducer;
