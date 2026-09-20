import DestinationCard from "../components/destinations/DestinationCard";
import destinations from "../data/destinations";

function Home() {
  const popularDestinations = destinations.filter(
    (destination) => destination.popular,
  );

  return (
    <main>
      <section className="hero">
        <div className="container hero__content">
          <div className="hero__text">
            <span className="hero__eyebrow">
              YOUR NEXT ADVENTURE STARTS HERE
            </span>

            <h1 className="hero__title">
              Explore the world.
              <br />
              Create unforgettable memories.
            </h1>

            <p className="hero__description">
              Discover inspiring destinations, plan your perfect trip, and turn
              your travel dreams into unforgettable experiences.
            </p>

            <div className="hero__search">
              <div className="hero__search-field">
                <label htmlFor="destination-search">
                  Where do you want to go?
                </label>

                <input
                  id="destination-search"
                  type="text"
                  placeholder="Search a destination..."
                />
              </div>

              <button type="button" className="hero__search-button">
                Explore
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__header">
            <div>
              <span className="section__eyebrow">DISCOVER</span>
              <h2 className="section__title">Popular destinations</h2>
              <p className="section__description">
                Explore some of the world's most inspiring destinations.
              </p>
            </div>

            <button type="button" className="section__link">
              View all destinations →
            </button>
          </div>

          <div className="destination-grid">
            {popularDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
