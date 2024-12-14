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
    currentChat:IChat| null
    isAuth:boolean
    activeUsers:unknown
    users:IUser[]
}

//change
export interface IChat{
    participants:string[],
    messages:string[]
}