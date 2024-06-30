'use client'

import { LoginIcon } from "@/components/icons/Login"
import { ButtonCircle, ButtonCircleUrl } from "@/components/interface/Buttons"
import { NAV_BAR_PAGE } from "@/configs/pages-url.config"
import useSession from "@/hooks/useSesion"
import { LogoutIcon } from "@/components/icons/Logout"
import { authService } from "@/services/auth/auth.services"
import { ProfileIcon } from "@/components/icons/Profile"
import Link from "next/link"

export function Authbar() {
    const { user } = useSession()

    return (
        <>
            {user ? (
                <div className="flex items-center justify-end gap-5 w-full">
                    <Link className="font-rubik tracking-wide flex items-center gap-2" href={"/profile"}>
                        {/* TODO: ССЫЛКА бляяяяя */}
                        <div className="block md:hidden lg:block">{user.username}</div>
                        <ProfileIcon />
                    </Link>
                    <ButtonCircle onClick={() => {authService.logout(); window.location.reload();}} >
                        <LogoutIcon />
                    </ButtonCircle>
                </div>
            ) : (
                <ButtonCircleUrl url={NAV_BAR_PAGE.LOGIN} >
                    {/* TODO: Анимацию пинга при простои и при наведении скейл */}
                    <LoginIcon />
                </ButtonCircleUrl>
            )}
        </>
    )
}