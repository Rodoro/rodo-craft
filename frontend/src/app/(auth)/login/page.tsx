import type { Metadata } from "next";
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { LoginForm } from "@/containers/form/Auth";
import { BgNormal } from "@/containers/pages/BgNormal";

export const metadata: Metadata = {
    title: 'Authorization',
    ...NO_INDEX_PAGE
}

export default function LoginPage() {
    return (
        <div className="w-full h-full">
            <BgNormal />
            <div className="absolute flex flex-row h-full w-full items-start justify-center pt-28 px-[5%] z-10">
                <div className="flex flex-row h-full w-full items-start justify-center py-[5%]">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}