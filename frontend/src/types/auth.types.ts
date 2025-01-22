export interface IRegForm {
    name: string
    email: string
    password: string
}

export interface IAuthResponse {
    accessToken: string
    refreshToken: string
}

export interface IUserJWT {
    sub: string
    username: string
    email: string
    roles: [{ value: string, description: string, _id: string }]
    img?: string
}