import prisma from "@/app/libs/prismadb"

export interface IListingParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

export default async function getListings(params: IListingParams) {
    try {
        const {userId, guestCount, bathroomCount, roomCount, category, startDate, endDate, locationValue} = params;
        let query: any = {};

        if (userId) {
            query.userId = userId;
        }

        if (category) {
            query.category = category;
        }

        if (roomCount) {
            query.roomCount = {
                // gte means greater than or equal and plus convert type string to number
                gte: +roomCount
            }
        }

        if (guestCount) {
            query.guestCount = {
                // gte means greater than or equal and plus convert type string to number
                gte: +guestCount
            }
        }

        if (bathroomCount) {
            query.bathroomCount = {
                // gte means greater than or equal and plus convert type string to number
                gte: +bathroomCount
            }
        }

        if (locationValue) {
            query.locationValue = locationValue;
        }

        // Search for dates which are reserved for ex. from 20 to 30 room is reserved so if we search for it from 22 to 24 it will be not available
        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: {gte: startDate},
                                startDate: {lte: startDate},
                            },
                            {
                                startDate: {lte: endDate},
                                endDate: {gte: endDate},
                            }
                        ]
                    }
                }
            }
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                CreatedAt: "desc"
            }
        })

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.CreatedAt.toISOString(),
        }));

        return safeListings;
    } catch (error: any) {
        throw new Error(error)
    }
}