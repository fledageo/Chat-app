import { createAction } from "@reduxjs/toolkit";
import { IChat, IMessage, IUser, IUserData } from "../../lib/types";

export const updateAuth = createAction<boolean>('user/auth')

export const setCurrentUser = createAction<IUserData>("user/current")

export const setActives = createAction<string[]>("user/actives")

export const setUsers = createAction<IUser[]>("user/users")

export const setCurrentChat = createAction<IChat | "start" | null>("user/chat")

export const setNewMessage = createAction<IMessage | null>("user/newMessage")

export const setUserConversations = createAction<string[] | null>("user/conversations")
