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
        <div className="w-full h-screen">
            <BgNormal />
            <div className="absolute flex flex-row h-full w-full items-center justify-center ">
                <LoginForm />
            </div>
        </div>
    )
}