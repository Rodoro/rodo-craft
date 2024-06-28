import Link from "next/link";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

export interface IButtonUrl {
    className?: string;
    url: string;
}

export function ButtonCircleUrl({ url, className, children, ...props }: PropsWithChildren<IButtonUrl>) {
    return (
        <Link href={url} {...props} className={className + " p-3 border-[3px] rounded-full border-white/40 cursor-pointer"}>
            {children}
        </Link>
    )
}
// TODO:АнимАЦИИ
export function ButtonGreen({ className, children, ...props }: PropsWithChildren<IButton>) {
    return (
        <button {...props} className={className + " bg-primary300 active:opacity-70 active:shadow-none cursor-pointer rounded-3xl transition-all"} style={{boxShadow: "0 0 17px -4px #0cc888"}}>
            {children}
        </button>
    )
}