import { createSlice } from "@reduxjs/toolkit";

export const stepperSlice = createSlice({
  name: "stepper",
  initialState: {
    currentStep: 1,
    currentFormData: {},
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
} = stepperSlice.actions;

export default stepperSlice.reducer;
