
import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast'

const initialState = {
  paste: localStorage.getItem("pastes")
  ?JSON.parse(localStorage.getItem("pastes"))
  : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.paste.push(paste)
      localStorage.setItem("pastes", JSON.stringify(state.paste))
      toast.success("Paste created successfully")
    },
    updateToPastes: (state, action) => {
      const updatedPaste = action.payload;
      const index = state.paste.findIndex((item) => item._id === updatedPaste._id);

      if (index >= 0) {
        state.paste[index] = updatedPaste;
        localStorage.setItem("pastes", JSON.stringify(state.paste))
        toast.success("Paste updated successfully")
      }
    },
    resetToPastes: (state) => {
      state.paste = [];
      localStorage.removeItem("pastes")
      toast.success("All pastes removed")
    },
    
    removeFromPastes:(state, action)=>{
      const pasteId = action.payload;
      state.paste = state.paste.filter((item) => item._id !== pasteId);
      localStorage.setItem("pastes", JSON.stringify(state.paste))
      toast.success("Paste deleted")
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetToPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer
