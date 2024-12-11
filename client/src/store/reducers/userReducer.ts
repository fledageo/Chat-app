import { createReducer } from "@reduxjs/toolkit";
import { IUserState } from "../../lib/types";
import { setCurrentUser, updateAuth } from "../actions/userActions";

const initialState:IUserState = {
    currentUser: null,
    isAuth:false
}

const userReducer = createReducer(initialState, builder => {
    builder
        .addCase(updateAuth, (state,action) => {
            state.isAuth = action.payload
        })
        .addCase(setCurrentUser,(state,action) => {
            state.currentUser = action.payload
        })
})


export default userReducer