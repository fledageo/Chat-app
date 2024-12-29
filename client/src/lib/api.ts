import axios from "axios";
import { IResponse, IUserData } from "./types";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const createUser = async (data: IUserData): Promise<IResponse> => {
    const response = await axios.post(`${API_URL}/auth/registration`, data)
    return response.data
}

export const login = async (data: IUserData): Promise<IResponse> => {
    const response = await axios.post(`${API_URL}/auth/login`, data, { withCredentials: true })
    return response.data
}

export const verifyAuth = async () => {
    const response = await axios.get(`${API_URL}/auth/verify`,{withCredentials:true})
    return response.data
}

export const getUserByUsername = async (username:string):Promise<IResponse> => {
    const response = await axios.get(`${API_URL}/user/${username}`)
    return response.data
} 

export const getAllUsers = async ():Promise<IResponse> => {
    const response = await axios.get(`${API_URL}/user`)
    return response.data
}

export const getChat = async(users:string[]):Promise<IResponse> => {
    const response = await axios.get(`${API_URL}/chat/`,{params:{users}})
    return response.data
}


export const getConversations = async(userId:string):Promise<IResponse> => {
    const response = await axios.get(`${API_URL}/chat/conversations`,{params:{userId}})
    return response.data
}
