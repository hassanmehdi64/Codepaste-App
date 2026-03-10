import { configureStore } from '@reduxjs/toolkit'
import pastereducer from '../redux/PasteSlice'

export const store = configureStore({
  reducer: pastereducer,
})