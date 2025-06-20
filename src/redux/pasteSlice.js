import { createSlice } from '@reduxjs/toolkit'
import {toast} from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes") 
  ? JSON.parse(localStorage.getItem("pastes"))
  : []
}

const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state,action) => {
      // add a check for paste already exists
      

      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id)

      if (index >= 0) {
        // If the course is already in the Pastes, do not modify the quantity
        toast.error("Paste already exist")
        return
      } 
      // If the paste does not exist, add it to the pastes array
      state.pastes.push(paste)
      // Save the updated pastes to localStorage
      localStorage.setItem("pastes", JSON.stringify(state.pastes))
      // Show success message
      toast.success("paste created successfully")
    },
    updateToPastes: (state,action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);
      if (index >= 0){
        // If the paste exists, update it
        state.pastes[index] = paste;
        // Save the updated pastes to localStorage
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        // Show success message
        toast.success("paste updated successfully");
      }
    },
    resetAllPastes: (state, action) => {
      const confirmReset = window.confirm("Are you sure you want to reset all pastes?");
      if (confirmReset) {
        state.paste = [];
        localStorage.removeItem("pastes");
        toast.success("All pastes have been reset");
      }
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      const index = state.paste.findIndex((p) => p._id === pasteId);
      if (index >= 0) {
        state.paste.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.paste));
        toast.success("Paste deleted successfully");
      } else {
        toast.error("Paste not found");
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const {addToPastes, updateToPastes, removeFromPastes, resetAllPastes } = pasteSlice.actions

export default pasteSlice.reducer