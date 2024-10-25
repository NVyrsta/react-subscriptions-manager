import { configureStore } from '@reduxjs/toolkit';
import subscriptionsReducer from '../features/subscriptionsSlice';

const store = configureStore({
  reducer: {
    subscriptions: subscriptionsReducer,
  },
});

export default store;
