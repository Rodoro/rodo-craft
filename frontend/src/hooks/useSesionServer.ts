import type { IUserJWT } from "@/types/auth.types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export default function useSession() {
    const cookieStore = cookies()
    const token = cookieStore.get('accessToken')
    if (token) {
        return jwtDecode<IUserJWT>(token.value);
    }
    return null
} 