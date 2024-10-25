import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/authService.js';

const filterData = (allList, subscriptions) => {
  const subscriptionIds = subscriptions.map((item) => item.id);
  return allList.filter((item) => !subscriptionIds.includes(item.id));
};

export const fetchData = createAsyncThunk('data/fetchData', async (type) => {
  const response = await api.get(`/${type}/`);
  return response.data;
});

export const fetchSubscriptions = createAsyncThunk(
  'data/fetchSubscriptions',
  async (type) => {
    const response = await api.get(`/subscriptions/${type}/`);

    return response.data;
  },
);

export const saveData = createAsyncThunk('data/saveData', async (data) => {
  const response = await api.post(
    `/subscriptions/${data.type}/`,
    data.requestBody,
  );

  return response.data;
});

const dataSlice = createSlice({
  name: 'subscriptions',
  initialState: {
    availableItems: [],
    selectedItems: [],
    loading: false,
    error: null,
  },
  reducers: {
    sortData(state) {
      state.selectedItems = state.availableItems
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name));
    },
    moveItems(state, action) {
      const { items, action: moveAction } = action.payload;

      if (moveAction === 'move') {
        state.selectedItems = [...state.selectedItems, ...items];
        state.availableItems = state.availableItems.filter(
          (item) => !items.some((toMove) => toMove.id === item.id),
        );
      } else if (moveAction === 'remove') {
        state.availableItems = [...state.availableItems, ...items];
        state.selectedItems = state.selectedItems.filter(
          (item) => !items.some((toRemove) => toRemove.id === item.id),
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.availableItems = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.availableItems = filterData(state.availableItems, action.payload);
        state.selectedItems = action.payload;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(saveData.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveData.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(saveData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { sortData, moveItems } = dataSlice.actions;

export default dataSlice.reducer;
