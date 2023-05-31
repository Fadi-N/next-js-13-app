'use client'
import {useRouter} from "next/navigation";
import Image from "next/image";

const Logo = () =>{
    const router = useRouter()
    return(
        <div className="hidden md:block cursor-pointer">
            LOGO
        </div>
        /*<Image className="hidden md:block cursor-pointer" src={} alt="Logo" height="100" width="100"/>*/
    )
}

export default Logo