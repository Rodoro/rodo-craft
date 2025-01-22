import { EnumTokens } from "./auth.services"
import Cookies from 'js-cookie';

export const getAccessToken = () => {
    const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
    return accessToken || null
}

export const saveTokensStorage = (accessToken: string, refreshToken: string) => {
    Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
        // domain: 'localhost',
        // sameSite: 'strict',
        // expires: 1
    })
    Cookies.set(EnumTokens.REFRESH_TOKEN, refreshToken, {
        // domain: 'localhost',
        // sameSite: 'strict',
        // expires: 1
    })
}

export const removeFromStorage = () => {
    Cookies.remove(EnumTokens.ACCESS_TOKEN)
    Cookies.remove(EnumTokens.REFRESH_TOKEN)
}