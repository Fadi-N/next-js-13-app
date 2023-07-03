'use client'

import Image from "next/image";

interface AvatarPropos{
    src: string | null | undefined
}

const Avatar = ({src} : AvatarPropos) =>{
    return(
        <Image className="rounded-full" src={src || "/images/placeholder.jpg"} width={30} height={30} alt="Avatar"/>
    )
}

export default Avatar