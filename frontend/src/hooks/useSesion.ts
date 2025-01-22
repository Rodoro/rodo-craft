import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function useSession() {
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        const token = getCookie('accessToken')

        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
            } catch (error) {
                console.error('Ошибка декодирования JWT:', error);
            }
        }
    }, [])

    return {user, setUser}
}

function getCookie(name: string) {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}