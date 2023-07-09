'use client'

import {SafeUser} from "@/app/types";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";

interface HeartButtonProps {
    listingId: string;
    currentUser?: SafeUser | null;
}

const HeartButton = ({listingId, currentUser}: HeartButtonProps) => {
    const hasFavorited = false;
    const toggleFavorite = () => {

    }

    return (
        <div className="relative hover:opacity-80 transition cursor-pointer" onClick={toggleFavorite}>
            <AiOutlineHeart
                className="fill-white absolute -top-[2px] -right-[2px]"
                size={28}
            />
            <AiFillHeart
                className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
                size={24}
            />
        </div>
    )
}

export default HeartButton