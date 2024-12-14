import { createAction } from "@reduxjs/toolkit";
import { IChat, IUser, IUserData } from "../../lib/types";

export const updateAuth = createAction<boolean>('user/auth')

export const setCurrentUser = createAction<IUserData>("user/current")

export const setActives = createAction("user/actives")

export const setUsers = createAction<IUser[]>("user/users")

export const setCurrentChat = createAction<IChat>("user/chat")