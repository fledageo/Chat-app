export interface IUser {
    username?:string,
    password?:string,
    _id?:string,
    __v?:number
}
export interface IUserData {
    username:string,
    password:string
}
export interface IResponse {
    status:string
    message?:string
    data?:unknown
}

export interface IUserState{
    currentUser:IUser | null
    currentChat:IChat | null
    currentSocket: WebSocket | null
    isAuth:boolean
    activeUsers:unknown
    users:IUser[]
    newMessages:NewMessages
}

export type NewMessages = {[key:string]:IMessage[]}

export interface IChat{
    participants:string[],
    _id:string
    _v:number
    messages:IMessage[]
}
export interface IMessage{
    content:string
    sender:string
    receiver:string
    timestamp?:string
    _id?:string
}
export interface ISendMessageData{
    sender:string
    receiver:string
    message: string
}
