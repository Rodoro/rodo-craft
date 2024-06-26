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