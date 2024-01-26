import { createSlice } from '@reduxjs/toolkit';

export const stepperSlice = createSlice({
  name: 'stepper',
  initialState: {
    currentStep: 1,
  },
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentStep } = stepperSlice.actions;

export default stepperSlice.reducer;
