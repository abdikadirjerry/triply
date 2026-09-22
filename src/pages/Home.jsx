import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import destinations from "../data/destinations";
import DestinationCard from "../components/destinations/DestinationCard";
import { useTrips } from "../context/TripsContext";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const { trips } = useTrips();

  const searchResults = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return destinations
      .filter(
        (destination) =>
          destination.name.toLowerCase().includes(query) ||
          destination.country.toLowerCase().includes(query) ||
          destination.category.toLowerCase().includes(query),
      )
      .slice(0, 4);
  }, [searchTerm]);

  const popularDestinations = destinations.filter(
    (destination) => destination.popular,
  );

  const featuredTrips = trips.slice(0, 3);

  return (
    <main>
      <section className="home-hero">
        <div className="home-hero__background" />

        <div className="container home-hero__content">
          <span className="section__eyebrow home-hero__eyebrow">
            DISCOVER YOUR NEXT ADVENTURE
          </span>

          <h1>
            Explore the world.
            <br />
            Plan the journey.
          </h1>

          <p>
            Discover beautiful destinations, save your favorites, and create
            trips you'll remember forever.
          </p>

          <div className="home-search">
            <div className="home-search__input-wrapper">
              <span className="home-search__icon">⌕</span>

              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search destinations, countries, or categories..."
                aria-label="Search destinations"
              />

              {searchTerm && (
                <button
                  type="button"
                  className="home-search__clear"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <Link to="/destinations" className="home-search__button">
              Explore
            </Link>

            {searchTerm && (
              <div className="home-search__results">
                {searchResults.length > 0 ? (
                  searchResults.map((destination) => (
                    <Link
                      to={`/destinations/${destination.slug}`}
                      className="home-search__result"
                      key={destination.id}
                      onClick={() => setSearchTerm("")}
                    >
                      <img src={destination.image} alt={destination.name} />

                      <div>
                        <strong>{destination.name}</strong>

                        <span>
                          {destination.country} · {destination.category}
                        </span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="home-search__no-results">
                    <strong>No destinations found</strong>

                    <span>
                      Try searching for a different destination, country, or
                      category.
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section home-popular">
        <div className="container">
          <div className="section__header">
            <div>
              <span className="section__eyebrow">POPULAR DESTINATIONS</span>

              <h2>Places travelers love</h2>

              <p>
                Explore some of the most popular destinations in the Triply
                collection.
              </p>
            </div>

            <Link to="/destinations" className="section__link">
              View all destinations →
            </Link>
          </div>

          <div className="home-popular__stats">
            <div className="home-popular__stat">
              <strong>{popularDestinations.length}</strong>

              <span>Popular destinations</span>
            </div>

            <div className="home-popular__stat">
              <strong>{destinations.length}</strong>

              <span>Destinations to explore</span>
            </div>

            <div className="home-popular__stat">
              <strong>4.8</strong>

              <span>Average traveler rating</span>
            </div>
          </div>

          <div className="destinations-grid">
            {popularDestinations.slice(0, 6).map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      <section className="section home-trips">
        <div className="container">
          <div className="section__header">
            <div>
              <span className="section__eyebrow">YOUR TRIPS</span>

              <h2>Plan your next adventure</h2>

              <p>
                Keep your travel plans organized and ready for your next
                journey.
              </p>
            </div>

            <Link to="/trips" className="section__link">
              Manage my trips →
            </Link>
          </div>

          {featuredTrips.length > 0 ? (
            <div className="home-trips__grid">
              {featuredTrips.map((trip) => (
                <Link to="/trips" className="home-trip-card" key={trip.id}>
                  <div className="home-trip-card__icon">🧳</div>

                  <div className="home-trip-card__content">
                    <span>TRIP</span>

                    <h3>{trip.name}</h3>

                    <p>
                      {trip.destinations.length}{" "}
                      {trip.destinations.length === 1
                        ? "destination"
                        : "destinations"}
                    </p>
                  </div>

                  <span className="home-trip-card__arrow">→</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="home-trips__empty">
              <div className="home-trips__empty-icon">🧳</div>

              <div>
                <h3>You don't have any trips yet</h3>

                <p>
                  Create your first trip and start planning your next adventure.
                </p>
              </div>

              <Link to="/trips" className="home-trips__button">
                Create a trip
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Home;
