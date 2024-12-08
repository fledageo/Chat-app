import axios from "axios";
import { IResponse, IUserData } from "./types";

export const createUser = async (data: IUserData): Promise<IUserData> => {
    const response = await axios.post("http://localhost:5000/api/auth/registration", data)
    return response.data
}

export const login = async (data: IUserData): Promise<IResponse> => {
    const response = await axios.post("http://localhost:5000/api/auth/login", data, { withCredentials: true })
    return response.data
}

export const verifyAuth = async () => {
    const response = await axios.get("http://localhost:5000/api/auth/verify",{withCredentials:true})
    return response.data
}