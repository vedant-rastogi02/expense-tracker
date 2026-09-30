import {createSlice} from '@reduxjs/toolkit'
// ! initial state
const authSlice=createSlice({
    name:"auth",
    initialState:{
        user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,


    },
    reducers:{
        loginAction:(state,action)=>{
            state.user=action.payload;
        },
        logoutAction:(state,action)=>{
            state.user=null;

        }
    },
})
export const {loginAction,logoutAction}=authSlice.actions;
// generate reducers
const authReducer=authSlice.reducer;
export default authReducer;