import type { Metadata } from "next";
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { LoginForm, RegForm } from "@/containers/form/Auth";
import { BgNormal } from "@/containers/pages/BgNormal";

export const metadata: Metadata = {
    title: 'Registration',
    ...NO_INDEX_PAGE
}

export default function RegPage() {
    return (
        <div className="w-full h-screen">
            <BgNormal />
            <div className="absolute flex flex-row h-full w-full items-center justify-center  pt-20 ">
                <RegForm />
            </div>
        </div>
    )
}