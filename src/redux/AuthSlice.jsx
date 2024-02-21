import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    auth : {},
    allImages : []
}

const AuthSlice = createSlice({
  name: 'second',
  initialState,
  reducers: {
    changeAuth : (state,{payload})=>{
      state.auth = payload;
    },
    allUserImages : (state,{payload})=>{
      console.log(payload);
      state.allImages = payload
    }
  }
});

export const {changeAuth,allUserImages} = AuthSlice.actions

export default AuthSlice.reducer