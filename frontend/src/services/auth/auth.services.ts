import { axiosClassic } from "@/api/intreceptors";
import { IAuthResponse, IRegForm, IUserJWT } from "@/types/auth.types";
import { getAccessToken, removeFromStorage, saveTokensStorage } from "./auth.helper";
import { jwtDecode } from "jwt-decode";
import useSession from "@/hooks/useSesion";

export enum EnumTokens {
    'ACCESS_TOKEN' = 'accessToken',
    'REFRESH_TOKEN' = 'refreshToken',
}

export const authService = {
    async main(type: 'login' | 'registration', data: IRegForm) {
        const response = await axiosClassic.post<IAuthResponse>(
            `/auth/${type}`,
            data
        )
        if (response.data.accessToken) saveTokensStorage(response.data.accessToken, response.data.refreshToken)
        return response
    },

    async getNewTokens() {
        const response = await axiosClassic.post<IAuthResponse>(
            '/auth/refresh'
        )

        if (response.data.accessToken) saveTokensStorage(response.data.accessToken, response.data.refreshToken)

        return response
    },

    async logout() {
        const token: any = getAccessToken()
        let userId = null
        if (token) {
            userId = jwtDecode<IUserJWT>(token).sub
        }
        const response = await axiosClassic.get<boolean>('/auth/logout/' + userId)
        if (response.status == 200) removeFromStorage()
        return response
    }
}