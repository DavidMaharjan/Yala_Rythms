import { configureStore } from '@reduxjs/toolkit'
import  counterSlice  from './reducerSlices/counterSlice.js'
import  boxSlice  from './reducerSlices/boxSlice.js'
import  userSlice  from './reducerSlices/userSlice.js'


export default configureStore({
  reducer: {
    counter: counterSlice,
    box: boxSlice,
    user: userSlice
  }
})