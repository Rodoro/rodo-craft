import { InputHTMLAttributes, PropsWithChildren, forwardRef } from "react";

export interface IField {
    label: string;
    type: string;
    error?: string;
    placeholder?: string;
    autoComplete?: string;
}

export const Field = forwardRef<HTMLInputElement, IField>(({ label, type, placeholder, error, ...rest }, ref) => {
    return (
        <div className="flex flex-col gap-2">
            {/* TODO:Испраить выделение при авто подстановки */}
            <label className="font-rubik tracking-wide">{label}</label>
            <input {...rest} ref={ref} type={type} placeholder={placeholder} className="text-sm py-[18px] px-6 focus-visible:outline-none transition-colors focus:border-primary300 bg-[#222434] border-[2px] border-[#404250] placeholder-white/50 rounded-2xl font-inter" />
            {error && (
                <div className="text-red-500 test-sm font-inter">{error}</div>
            )}
        </div>
    )
})

Field.displayName = 'filed'