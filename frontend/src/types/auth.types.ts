export interface IRegForm {
    name: string
    email: string
    password: string
}

export interface IAuthResponse {
    accessToken: string
    refreshToken: string
}