import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/authService';

export const fetchSubscriptions = createAsyncThunk(
  'subscriptions/fetchSubscriptions',
  async (type) => {
    const availableEndpoint = type === 'companies' ? '/companies/' : '/mines/';
    const selectedEndpoint = `/subscriptions/${type}/`;

    const availableRes = await api.get(availableEndpoint);
    const selectedRes = await api.get(selectedEndpoint);

    return {
      availableItems: availableRes.data,
      selectedItems: selectedRes.data,
    };
  },
);

export const saveSubscriptions = createAsyncThunk(
  'subscriptions/saveSubscriptions',
  async ({ type, selectedIds }) => {
    const requestBody =
      type === 'companies'
        ? { company_ids: selectedIds }
        : { mine_ids: selectedIds };

    await api.post(`/subscriptions/${type}/`, requestBody);
  },
);

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState: {
    availableItems: [],
    selectedItems: [],
    loading: false,
    error: null,
  },
  reducers: {
    moveToSelected: (state, action) => {
      state.selectedItems.push(...action.payload);
      state.availableItems = state.availableItems.filter(
        (item) => !action.payload.includes(item),
      );
    },
    moveToAvailable: (state, action) => {
      state.availableItems.push(...action.payload);
      state.selectedItems = state.selectedItems.filter(
        (item) => !action.payload.includes(item),
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.availableItems = action.payload.availableItems;
        state.selectedItems = action.payload.selectedItems;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { moveToSelected, moveToAvailable } = subscriptionsSlice.actions;

export default subscriptionsSlice.reducer;
