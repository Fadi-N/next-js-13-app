'use client'

// https://www.npmjs.com/package/react-hook-form
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "@/app/components/Modal/Modal";
import {useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
import {FcGoogle} from "react-icons/fc";
import {AiFillGithub} from "react-icons/ai";
import useLoginModal from "@/app/hooks/useLoginModal";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

const LoginModal = () => {
    const router = useRouter()
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        signIn('credentials', {...data, redirect: false})
            .then((callback) =>{
                setIsLoading(false);
                if(callback?.ok){
                    toast.success("Logged in");
                    router.refresh();
                    loginModal.onClose();
                }

                if (callback?.error){
                    toast.error(callback.error)
                }
            })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome back"
                subtitle="Login in to your account!"
            />
            <Input
                id="email"
                label="Email"
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                type="password"
                label="Password"
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr/>
            <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => {
            }}/>
            <Button outline label="Continue with Github" icon={AiFillGithub} onClick={() => {
            }}/>
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex flex-row justify-center items-center gap-2">
                    <div>Already have an account?</div>
                    <div className="text-neutral-800 cursor-pointer hover:underline" onClick={loginModal.onClose}>Log in</div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal