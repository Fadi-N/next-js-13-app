import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getFavoriteListings from "@/app/actions/getFavoriteListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import FavoritesClient from "@/app/favorites/FavoritesClient";
import Container from "@/app/components/Container";

const ListingPage = async () => {
    const currentUser = await getCurrentUser();
    const listings = await getFavoriteListings();

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No favorites found"
                    subtitle="Looks like you have no favorites listings."
                />
            </ClientOnly>
        )
    }

    return (
        <Container>
            <FavoritesClient
                listings={listings}
                currentUser={currentUser}
            />
        </Container>
    )
}

export default ListingPage