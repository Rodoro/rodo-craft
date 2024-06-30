import { ButtonGreen } from "@/components/interface/Buttons";
import { BgNormal } from "./BgNormal";
import Image from 'next/image'
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="w-full h-full">
            <BgNormal />
            <div className="absolute w-full h-full flex flex-col items-center justify-center">
                <Image className="pl-8" src={"/img/interface/bg-404.webp"} alt={"404"} width="861" height='861' />
                <p className="font-inter text-center text-base max-w-[500px] mb-12 px-[5%]">
                    Something went wrong, go back or contact the administration
                </p>
                <ButtonGreen className="py-[12px] md:py-[22px] px-[45px]">
                    {/* TODO: Ссылки */}
                    <Link href={"/"} className="font-rubik text-2xl md:text-[32px]">
                        Main
                    </Link>
                </ButtonGreen>
            </div>
        </div>
    )
}