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

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post("/api/register", data)
            .then(() => {
                registerModal.onClose();
            })
            .catch((error) => {
                // https://www.npmjs.com/package/react-hot-toast
                toast.error('Something went wrong!')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome to ..."
                subtitle="Create an account!"
            />
            <Input
                id="email"
                label="Email"
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Name"
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
                    <div className="text-neutral-800 cursor-pointer hover:underline" onClick={registerModal.onClose}>Log in</div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal