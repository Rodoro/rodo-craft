import { LogoAndName } from "@/components/common/Logo";
import { LoginIcon } from "@/components/icons/Login";
import { ButtonCircleUrl } from "@/components/interface/Buttons";
import { NAV_BAR_PAGE } from "@/configs/pages-url.config";
import Link from "next/link";

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

export function ItemMenu({ item }: { item: IMenuItem }) {
  return (
    // TODO: Анимация при наведении и нажате
    // TODO: Отрисовка при посещении
    <Link href={item.link} className="uppercase font-guy tracking-wider">{item.name}</Link>
  )
}

export function Navbar() {
  return (
    // TODO: Адпатация
    <nav className="fixed bg-[#404250]/[.70] h-[102px] w-full flex flex-row justify-around items-center max-w-[1787px] right-0 left-0 m-auto z-50"
      style={{ backdropFilter: "blur(16px)", boxShadow: "0 2px 25px 4px rgba(0, 0, 0, 0.25)" }}>
      <LogoAndName />
      <div className="flex flex-row items-center justify-between gap-8">
        {MENU.map(item => (
          <ItemMenu item={item} key={item.link} />
        ))}
      </div>
      <div className="flex flex-row justify-end items-center min-w-[200px]">
        {/* TODO: Анимацию пинга при простои и при наведении скейл */}
        <ButtonCircleUrl url={NAV_BAR_PAGE.LOGIN} >
          <LoginIcon />
        </ButtonCircleUrl>
      </div>
    </nav >
  )
}