import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  paste: localStorage.getItem('paste') 
  ? JSON.parse(localStorage.getItem('paste'))
  : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state,action) => {
      // add a check for paste already exists
      const existingPaste = state.paste.find(p => p.title === action.payload.title);
      if (existingPaste) {
        toast.error("Paste with this title already exists");
        return;
      }

      const paste = action.payload;
      state.paste.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.paste));
      toast.success("paste created successfully");
    },
    updateToPastes: (state,action) => {
      const paste = action.payload;
      const index = state.paste.findIndex(p => p._id === paste._id);
      if (index >= 0){
        state.paste[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.paste));
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
    deleteFromPastes: (state, action) => {
      const pasteId = action.payload;
      const index = state.paste.findIndex(p => p._id === pasteId);
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
export const {addToPastes, updateToPastes, deleteFromPastes, resetAllPastes } = pasteSlice.actions

export default pasteSlice.reducer