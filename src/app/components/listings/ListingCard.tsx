"use client"

import {SafeListing, SafeReservation, SafeUser} from "@/app/types";
import {useRouter} from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import React, {useCallback, useMemo} from "react";
import {format} from "date-fns";
import Image from "next/image";
import HeartButton from "@/app/components/HeartButton";
import Button from "@/app/components/Button";

interface ListingCardProps {
    data: SafeListing;
    reservation?: SafeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const ListingCard = ({
                         data,
                         currentUser,
                         actionId = "",
                         onAction,
                         actionLabel,
                         reservation,
                         disabled
                     }: ListingCardProps) => {
    const router = useRouter();
    const {getByValue} = useCountries();

    const location = getByValue(data.locationValue)

    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (disabled) {
            return;
        }

        onAction?.(actionId);
    }, [onAction, actionId, disabled])

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }

        return data.price;
    }, [reservation, data.price])

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }

        const start = new Date(reservation.startDate)
        const end = new Date(reservation.endDate)

        // https://www.npmjs.com/package/date-fns
        return `${format(start, "pp")} - ${format(end, "PP")}`
    }, [reservation])

    return (
        <div className="col-span-1 cursor-pointer group" onClick={() => router.push(`/listings/${data.id}`)}>
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image
                        className="object-cover h-full w-full group-hover:scale-110 transition"
                        src={data.imageSrc}
                        alt="Listing"
                        fill
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton
                            listingId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                <div className="font-semibold text-lg">{location?.region}, {location?.label}</div>
                <div className="font-light text-gray-500">{reservationDate || data.category}</div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">$ {price}</div>
                    {!reservation && (
                        <div className="font-light">night</div>
                    )}
                </div>
                {onAction && actionLabel && (
                    <Button
                        label={actionLabel}
                        onClick={handleCancel}
                        disabled={disabled}
                        small
                    />
                )}
            </div>
        </div>
    )
}

export default ListingCard