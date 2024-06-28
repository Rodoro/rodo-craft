import { axiosClassic } from "@/api/intreceptors";
import { IAuthResponse, IRegForm } from "@/types/auth.types";
import { removeFromStorage, saveTokenStorage } from "./auth.helper";

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
        if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

        return response
    },

    async getNewTokens() {
        const response = await axiosClassic.post<IAuthResponse>(
            '/auth/refresh'
        )

        if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

        return response
    },

    async logout() { 
        const response = await axiosClassic.post<boolean>('/auth/logout')

        if (response.data) removeFromStorage()

        return response
    }
}