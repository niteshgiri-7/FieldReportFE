export interface ICredentials {
    email:string;
    password:string;
}

export interface IError {
    name?:string;
    message?:string;
    isError?:boolean;
}