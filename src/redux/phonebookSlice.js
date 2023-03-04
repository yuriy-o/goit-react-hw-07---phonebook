import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState: {
    items: [],
    filter: '',
    isLoading: false,
    error: null,
  },
  reducers: {
    filterChange(state, action) {
      state.filter = action.payload.toLowerCase();
    },
  },

  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [fetchContacts.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
      toast(`You have ${state.items.length} contacts!`);
    },
    [fetchContacts.rejected]: handleRejected,
    [addContact.pending]: handleRejected,
    [addContact.fulfilled]: (state, action) => {
      state.items.unshift(action.payload);
      // state.items = state.items.filter(item => item.id !== action.payload.id);
      state.isLoading = false;
      state.error = null;
      toast.info('👍🏼 Contact created!');
    },
    [addContact.rejected]: handleRejected,
    [deleteContact.pending]: handlePending,
    [deleteContact.fulfilled]: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      state.isLoading = false;
      state.error = null;
      toast.warning('❌ Contact deleted!');
    },
    [deleteContact.rejected]: handleRejected,
  },
});

export const { filterChange } = phonebookSlice.actions;
export const PhonebookReducer = phonebookSlice.reducer;
