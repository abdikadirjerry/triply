import DestinationCard from "../components/destinations/DestinationCard";
import destinations from "../data/destinations";
import featuredTrips from "../data/trips";

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

      <section className="section section--featured">
        <div className="container">
          <div className="section__header">
            <div>
              <span className="section__eyebrow">PLAN YOUR JOURNEY</span>

              <h2 className="section__title">Featured trips</h2>

              <p className="section__description">
                Get inspired by carefully selected travel experiences.
              </p>
            </div>
          </div>

          <div className="trip-grid">
            {featuredTrips.map((trip) => (
              <article className="trip-card" key={trip.id}>
                <div className="trip-card__image-wrapper">
                  <img
                    className="trip-card__image"
                    src={trip.image}
                    alt={trip.title}
                  />
                </div>

                <div className="trip-card__content">
                  <p className="trip-card__location">{trip.location}</p>

                  <h3 className="trip-card__title">{trip.title}</h3>

                  <p className="trip-card__description">{trip.description}</p>

                  <div className="trip-card__footer">
                    <span>{trip.duration}</span>

                    <button type="button">View trip →</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
