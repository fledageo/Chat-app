import axios from "axios";
import { IResponse, ISendMessageData, IUserData } from "./types";

export const createUser = async (data: IUserData): Promise<IResponse> => {
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

export const getUserByUsername = async (username:string):Promise<IResponse> => {
    const response = await axios.get(`http://localhost:5000/api/user/${username}`)
    return response.data
} 

export const getAllUsers = async ():Promise<IResponse> => {
    const response = await axios.get(`http://localhost:5000/api/user`)
    return response.data
}

export const getChat = async(users:string[]):Promise<IResponse> => {
    const response = await axios.get("http://localhost:5000/api/chat/",{params:{users}})
    return response.data
}


export const getConversations = async(userId:string):Promise<IResponse> => {
    const response = await axios.get("http://localhost:5000/api/chat/conversations",{params:{userId}})
    return response.data
}
