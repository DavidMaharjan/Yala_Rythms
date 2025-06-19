import { createSlice } from '@reduxjs/toolkit'
const intialState ={
  email: '',
  token : '',
  isLoggedin: false,
  firstName: '',
  
}

export const userSlice = createSlice({
  name: 'user',
  initialState: intialState,
  reducers: {
    logoutUser: state => {
      return initialState
    },
    addLoginDetails: (state, action) => {
      return {
        ...state,
        email:  action.payload.user?.email,
        token: action.payload?.token,
        isLoggedin:  action.payload?.isLoggedin,
        firstName:  action.payload?.user.firstName,
        _id:  action.payload?.user._id,
      }
    },
  }
})
export const { logoutUser, addLoginDetails} = userSlice.actions

export default userSlice.reducer