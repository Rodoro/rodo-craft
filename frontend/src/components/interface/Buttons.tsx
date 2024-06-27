import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

export function ButtonCircle({ className, children, ...props }: PropsWithChildren<IButton>) {
    return (
        <button {...props} className={className + " p-3 border-[3px] rounded-full border-white/40 cursor-pointer"}>
            {children}
        </button>
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