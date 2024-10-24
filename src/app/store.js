import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import subscriptionsReducer from '../features/subscriptionsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    subscriptions: subscriptionsReducer,
  },
});

export default store;
