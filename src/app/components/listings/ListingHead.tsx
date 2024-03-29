'use client'

import {SafeUser} from "@/app/types";
import useCountries from "@/app/hooks/useCountries";
import Heading from "@/app/components/Heading";
import Image from "next/image";
import HeartButton from "@/app/components/HeartButton";

interface ListingHeadProps {
    title: string;
    imageSrc: string;
    locationValue: string;
    id: string;
    currentUser?: SafeUser | null
}

const ListingHead = ({title, id, locationValue, imageSrc, currentUser}: ListingHeadProps) => {
    const {getByValue} = useCountries()
    const location = getByValue(locationValue)

    return (
        <>
            <Heading
                title={title}
                subtitle={`${location?.region}, ${location?.label}`}
            />

            <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                <Image
                    className="object-cover w-full"
                    src={imageSrc}
                    alt="Image"
                    fill
                />
                <div className="absolute top-5 right-5">
                    <HeartButton
                        listingId={id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </>
    )
}
export default ListingHead