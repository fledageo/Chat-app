import { createReducer } from "@reduxjs/toolkit";
import { IMessage, IUser, IUserState } from "../../lib/types";
import { setActives, setCurrentChat, setCurrentUser, setNewMessage, setUsers, updateAuth } from "../actions/userActions";

const initialState:IUserState = {
    isAuth:false,
    currentUser: null,
    currentSocket:null,
    currentChat:null,
    activeUsers:[],
    users:[],
    newMessages:{}
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
        .addCase(setNewMessage,(state,action) => {
            const message = action.payload as IMessage
            if(message.sender in state.newMessages){
               state.newMessages[message.sender].push(message) 
            }else{
                state.newMessages[message.sender] = [message]
            }
        })
        
})


export default userReducer