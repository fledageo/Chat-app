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
    isAuth:boolean
}

export interface IUser {
    username:string,
    password:string,
    _id:string,
    __v:number
}