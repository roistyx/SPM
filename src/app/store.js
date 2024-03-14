import { configureStore } from "@reduxjs/toolkit";
import drawerReducer from "../components/Drawer/drawerSlice";
import stepperSlice from "../features/Stepper/stepperSlice";

export const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    stepper: stepperSlice,
  },
});
