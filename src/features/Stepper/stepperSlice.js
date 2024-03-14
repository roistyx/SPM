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
    SET_FORM_DATA: (state, action) => {
      state.currentFormData = action.payload;
    },
    setErrorMessage: (state, action) => {
      const { field, message } = action.payload;
      state.errors[field] = message;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentStep, currentFormData } = stepperSlice.actions;

export default stepperSlice.reducer;
