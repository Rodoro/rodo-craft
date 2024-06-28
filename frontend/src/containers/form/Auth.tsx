'use client'
import { ButtonGreen } from "@/components/interface/Buttons";
import { Field } from "@/components/interface/Field";
import { authService } from "@/services/auth/auth.services";
import { IRegForm } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export function LoginForm() {
    return (
        <div className='w-full max-w-[540px] bg-[#222434] rounded-3xl' style={{ boxShadow: "0px 2px 25px 4px rgba(0, 0, 0, 0.25)" }}>
            <div className='grid grid-cols-2 w-full h-[73px]'>
                {/* TODO:Вынести ссылки */}
                <Link className={'bg-primary300 rounded-tl-3xl col-span-1 flex items-center justify-center text-lg font-rubik tracking-wide'} href={"/login"}>
                    Login
                </Link>
                <Link className={'bg-[#303141] rounded-tr-3xl col-span-1 flex items-center justify-center text-lg font-rubik tracking-wide'} href={"/registration"}>
                    Sign Up
                </Link>
            </div>
            <form className='flex flex-col my-9 mx-11 gap-11'>
                <Field label={"Email *"} type={"text"} placeholder={"Enter Your Email"} />
                <Field label={"Password *"} type={"text"} placeholder={"Enter Your Password"} />
                <ButtonGreen className="py-4 font-rubik text-lg tracking-wide">
                    Login
                </ButtonGreen>
            </form>
        </div>
    )
}

export function RegForm() {
    const { register, handleSubmit, reset } = useForm<IRegForm>({
        mode: 'onChange'
    })

    const {push} = useRouter()

    const { mutate } = useMutation({
        mutationKey: ['reg'],
        mutationFn: ( data:IRegForm) => 
            authService.main('registration', data),
            onSuccess() {
                reset()
                push('/')
            }
    })
    // TODO:Сылки в конфиг

    const onSubmit: SubmitHandler<IRegForm> = (data) => {
        mutate(data)
    }

    return (
        <div className='w-full max-w-[540px] bg-[#222434] rounded-3xl' style={{ boxShadow: "0px 2px 25px 4px rgba(0, 0, 0, 0.25)" }}>
            <div className='grid grid-cols-2 w-full h-[73px]'>
                {/* TODO:Вынести ссылки */}
                <Link className={'bg-[#303141] rounded-tl-3xl col-span-1 flex items-center justify-center text-lg font-rubik tracking-wide'} href={"/login"}>
                    Login
                </Link>
                <Link className={'bg-primary300 rounded-tr-3xl col-span-1 flex items-center justify-center text-lg font-rubik tracking-wide'} href={"/registration"}>
                    Sign Up
                </Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col my-9 mx-11 gap-11'>
                <Field
                    label={"Nickname *"}
                    type={"text"}
                    placeholder={"Enter Your Nickname"}
                    {...register('name', {
                        required: 'Nickname is required!'
                    })}
                />
                <Field
                    label={"Email *"}
                    type={"email"}
                    placeholder={"Enter Your Email"}
                    {...register('email', {
                        required: 'Email is required!'
                    })}
                />
                <Field
                    label={"Password *"}
                    type={"password"}
                    autoComplete="password"
                    placeholder={"Enter Your Password"}
                    {...register('password', {
                        required: 'Password is required!'
                    })}
                />
                <ButtonGreen

                    className="py-4 font-rubik text-lg tracking-wide">
                    Sign Up
                </ButtonGreen>
            </form>
        </div>
    )
}