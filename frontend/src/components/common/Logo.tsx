import { NAV_BAR_PAGE } from '@/configs/pages-url.config'
import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
    return (
        // TODO: Лого в svg
        <Image src={'/img/logo.png'} alt={'Logo'} width="57" height="57"/>
    )
}

export function LogoAndName() {
    return (
        <Link className="flex items-center justify-between" href={NAV_BAR_PAGE.MAIN}>
            <Logo />
            <div>
                <div className=" font-guy text-3xl tracking-wide">Rodo<span className="text-primary300">Craft</span></div>
                <div className=' font-rubik text-xs text-center tracking-[3px]'>miniecraft server</div>
            </div>
        </Link>
    )
}