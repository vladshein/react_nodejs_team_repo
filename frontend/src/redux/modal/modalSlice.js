import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  modalType: null,
  modalProps: {},
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      // Set new modal state
      state.isModalOpen = true;
      state.modalType = action.payload.modalType;
      state.modalProps = action.payload.modalProps || {};
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalType = null;
      state.modalProps = {};
    },
    updateModalProps: (state, action) => {
      state.modalProps = { ...state.modalProps, ...action.payload };
    },
  },
});

export const { openModal, closeModal, updateModalProps } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
