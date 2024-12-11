import { createAction } from "@reduxjs/toolkit";
import { IUserData } from "../../lib/types";

export const updateAuth = createAction<boolean>('user/auth')

export const setCurrentUser = createAction<IUserData>("user/current")