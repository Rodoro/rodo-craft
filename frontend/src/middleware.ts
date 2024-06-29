import { EnumTokens, authService } from "@/services/auth/auth.services"
import { jwtDecode } from "jwt-decode"
import { NextRequest, NextResponse } from "next/server"
import { IUserJWT } from "./types/auth.types"

export async function middleware(request: NextRequest, response: NextResponse) {
    const accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)



    if (!accessToken && configs.some(config => config.some(route => request.url.includes(route)))) {
        return NextResponse.redirect(new URL('/404', request.url))
    }

    if (accessToken && request.url.includes('login' || 'registration')) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (accessToken) {
        const decoded = jwtDecode<IUserJWT>(accessToken.value)
        const userRoles = decoded.roles.map((role) => role.value)

        const requiredRole = configs.findIndex((config) => config.some((route) => request.url.includes(route)));
        if (requiredRole !== -1) {
            const requiredRoleLevel = requiredRole + 1;
            console.log(requiredRoleLevel)
            const userRoleLevel = Object.values(Roles).indexOf(userRoles[0]) + 1;
            //TODO:ФИКСИТЬ типы ролей

            if (userRoleLevel < requiredRoleLevel) {
                return NextResponse.redirect(new URL('/404', request.url))
            }
        }
    }

    return NextResponse.next()
}

enum Roles {
    USER = 'USER',
    MODER = 'MODER',
    ADMIN = 'ADMIN',
    OWNER = 'OWNER',
}

export const configUser = ['/profile'];
export const configModer = ['/moder'];
export const configAdmin = ['/admin'];
export const configOwner = ['/owner', '/owner/:path'];
export const configs = [configUser, configModer, configAdmin, configOwner];