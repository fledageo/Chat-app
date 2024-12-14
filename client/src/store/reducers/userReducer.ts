import { createReducer } from "@reduxjs/toolkit";
import { IUser, IUserState } from "../../lib/types";
import { setActives, setCurrentChat, setCurrentUser, setUsers, updateAuth } from "../actions/userActions";

const initialState:IUserState = {
    currentUser: null,
    currentChat:null,
    isAuth:false,
    activeUsers:[],
    users:[]
}

const userReducer = createReducer(initialState, builder => {
    builder
        .addCase(updateAuth, (state,action) => {
            state.isAuth = action.payload
        })
        .addCase(setCurrentUser,(state,action) => {
            state.currentUser = action.payload as IUser
        })
        .addCase(setActives,(state,action) => {
            state.activeUsers = action.payload 
        })
        .addCase(setUsers,(state,action) => {
            state.users = action.payload
        })
        .addCase(setCurrentChat,(state,action) => {
            state.currentChat = action.payload
        })
})


export default userReducer