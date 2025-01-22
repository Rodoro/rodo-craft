'use client'

import { LogoAndName } from "@/components/common/Logo";
import { NAV_BAR_PAGE } from "@/configs/pages-url.config";
import Link from "next/link";
import { Authbar } from "../auth/Authbar";
import MenuIcon from "@/components/icons/Menu";
import { usePathname } from "next/navigation";
import { useState } from "react";

// TODO:ВЫнести в types
export interface IMenuItem {
  link: string;
  name: string;
}

const MENU: IMenuItem[] = [
  {
    name: 'About as',
    link: NAV_BAR_PAGE.MAIN
  },
  {
    name: 'Servers',
    link: NAV_BAR_PAGE.SERVERS
  },
  {
    name: 'Vacancy',
    link: NAV_BAR_PAGE.VACANCY
  },
  {
    name: 'Wiki',
    link: NAV_BAR_PAGE.WIKI
  },
]

export function ItemMenu({ item, url, onClick }: { item: IMenuItem, url: string, onClick: any }) {
  return (
    // TODO: Анимация при наведении и нажате
    <Link href={item.link} onClick={() => onClick(false)} className={(url == item.link ? "text-primary300" : "") + " uppercase font-guy tracking-wider"}>{item.name}</Link>
  )
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const pathname = usePathname()
  return (
    // TODO: Адпатация

    <div>
      <nav className="fixed bg-[#404250]/[.70] h-[102px] w-full flex flex-row justify-between px-[5%] md:px-0 md:justify-around items-center max-w-[1787px] right-0 left-0 m-auto z-50"
        style={{ backdropFilter: "blur(16px)", boxShadow: "0 2px 25px 4px rgba(0, 0, 0, 0.25)" }}>
        <LogoAndName />
        <div className="hidden md:flex flex-row items-center justify-between gap-8">
          {MENU.map(item => (
            <ItemMenu onClick={setIsOpen} url={pathname} item={item} key={item.link} />
          ))}
        </div>
        <div className="hidden md:flex flex-row justify-end items-center">
          <Authbar />
        </div>
        <div className="md:hidden flex items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          {/* TODO:Анимация открытия и закрытия */}
          <MenuIcon />
        </div>
      </nav >
      <div onClick={() => setIsOpen(false)} className={(isOpen ? 'flex' : 'hidden') + " flex-col items-center justify-center text-xl gap-10 md:hidden bg-[#1C182F] absolute w-full h-full top-0 left-0 py-[20%] px-[10%] z-40"}>
        {MENU.map(item => (
          <ItemMenu onClick={setIsOpen} url={pathname} item={item} key={item.link} />
        ))}
        <div className="max-w-[200px] w-full flex justify-center" onClick={() => setIsOpen(false)}>
          <Authbar />
        </div>
      </div>
    </div>
  )
}