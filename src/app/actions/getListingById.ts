import prisma from "@/app/libs/prismadb";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

interface IParams {
    listingId?: string;
}

export default async function getListingById(params: IParams) {
    try {
        const {listingId} = params;

        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                user: true
            }
        })

        if (!listing) {
            return null;
        }

        return {
            ...listing,
            createdAt: listing.CreatedAt.toISOString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toISOString(),
                updatedAt: listing.user.createdAt.toISOString(),
                emailVerified: listing.user.emailVerified?.toISOString() || null
            }
        }
    } catch
        (error: any) {
        throw new Error()
    }
}