import { configureStore } from '@reduxjs/toolkit';
import drawerReducer from '../components/Drawer/drawerSlice.js';
import stepperSlice from '../features/Stepper/stepperSlice.js';

export const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    stepper: stepperSlice,
  },
});
