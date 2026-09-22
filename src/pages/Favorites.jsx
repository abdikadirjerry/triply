import { Link } from "react-router-dom";
import DestinationCard from "../components/destinations/DestinationCard";
import destinations from "../data/destinations";
import { useFavorites } from "../context/FavoritesContext";

function Favorites() {
  const { favoriteIds } = useFavorites();

  const favoriteDestinations = destinations.filter((destination) =>
    favoriteIds.includes(destination.id),
  );

  return (
    <main className="favorites-page">
      <section className="favorites-page__hero">
        <div className="container">
          <span className="section__eyebrow">YOUR COLLECTION</span>

          <h1>Favorite destinations</h1>

          <p>
            Keep the places that inspire you close and come back whenever you're
            ready to plan your next adventure.
          </p>
        </div>
      </section>

      <section className="favorites-page__content">
        <div className="container">
          {favoriteDestinations.length > 0 ? (
            <>
              <div className="favorites-page__header">
                <div>
                  <span className="section__eyebrow">SAVED PLACES</span>

                  <h2>
                    {favoriteDestinations.length}{" "}
                    {favoriteDestinations.length === 1
                      ? "destination"
                      : "destinations"}
                  </h2>
                </div>

                <Link to="/destinations" className="favorites-page__browse">
                  Explore more →
                </Link>
              </div>

              <div className="destinations-grid">
                {favoriteDestinations.map((destination) => (
                  <DestinationCard
                    key={destination.id}
                    destination={destination}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="favorites-empty">
              <div className="favorites-empty__icon">♡</div>

              <span className="section__eyebrow">NO FAVORITES YET</span>

              <h2>Start building your travel wishlist</h2>

              <p>
                Save destinations you love and they'll appear here so you can
                easily find them later.
              </p>

              <Link to="/destinations" className="favorites-empty__button">
                Explore destinations
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Favorites;
