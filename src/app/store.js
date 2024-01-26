import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/authSlice';
import searchReducer from '../features/Search/searchSlice';
import newsReducer from '../features/News/newsSlice';
import drawerReducer from '../components/Drawer/drawerSlice';
import reportsSlice from '../features/Financials/fiancialReportsSlice';
import stepperSlice from '../features/Stepper/stepperSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    news: newsReducer,
    drawer: drawerReducer,
    reports: reportsSlice,
    stepper: stepperSlice,
  },
});
