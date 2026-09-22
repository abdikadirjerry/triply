import { Link, useParams } from "react-router-dom";
import destinations from "../data/destinations";
import { useFavorites } from "../context/FavoritesContext";

function DestinationDetails() {
  const { slug } = useParams();

  const { isFavorite, toggleFavorite } = useFavorites();

  const destination = destinations.find((item) => item.slug === slug);

  if (!destination) {
    return (
      <main className="destination-not-found">
        <div className="container">
          <div className="destination-not-found__content">
            <span className="destination-not-found__icon">🌍</span>

            <h1>Destination not found</h1>

            <p>We couldn't find the destination you're looking for.</p>

            <Link to="/destinations">Back to destinations</Link>
          </div>
        </div>
      </main>
    );
  }

  const favorite = isFavorite(destination.id);

  const handleFavoriteClick = () => {
    toggleFavorite(destination.id);
  };

  return (
    <main>
      <section className="destination-detail-hero">
        <img
          className="destination-detail-hero__image"
          src={destination.image}
          alt={destination.name}
        />

        <div className="destination-detail-hero__overlay">
          <div className="container destination-detail-hero__content">
            <Link to="/destinations" className="destination-detail-hero__back">
              ← Back to destinations
            </Link>

            <div className="destination-detail-hero__info">
              <span className="destination-detail-hero__category">
                {destination.category}
              </span>

              <h1>{destination.name}</h1>

              <p>
                {destination.country} · ★ {destination.rating}
              </p>
            </div>

            <button
              type="button"
              className={`destination-detail-hero__favorite ${
                favorite ? "destination-detail-hero__favorite--active" : ""
              }`}
              onClick={handleFavoriteClick}
            >
              <span>{favorite ? "♥" : "♡"}</span>

              {favorite ? "Saved to favorites" : "Add to favorites"}
            </button>
          </div>
        </div>
      </section>

      <section className="destination-detail-section">
        <div className="container">
          <div className="destination-detail-layout">
            <div className="destination-detail-main">
              <div className="destination-detail-intro">
                <span className="section__eyebrow">
                  DISCOVER {destination.name.toUpperCase()}
                </span>

                <h2>About {destination.name}</h2>

                <p>{destination.description}</p>
              </div>

              <div className="destination-detail-content">
                <h2>Things to do</h2>

                <div className="detail-list">
                  {destination.activities.map((activity) => (
                    <div className="detail-list__item" key={activity}>
                      <span className="detail-list__icon">✓</span>

                      <span>{activity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="destination-detail-content">
                <h2>Places to visit</h2>

                <div className="places-grid">
                  {destination.places.map((place) => (
                    <div className="place-card" key={place}>
                      <span className="place-card__icon">📍</span>

                      <span>{place}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="travel-info">
              <div className="travel-info__header">
                <span className="section__eyebrow">TRAVEL GUIDE</span>

                <h2>Travel information</h2>
              </div>

              <div className="travel-info__items">
                <div className="travel-info__item">
                  <span className="travel-info__label">Best time</span>

                  <strong>{destination.bestTime}</strong>
                </div>

                <div className="travel-info__item">
                  <span className="travel-info__label">Language</span>

                  <strong>{destination.language}</strong>
                </div>

                <div className="travel-info__item">
                  <span className="travel-info__label">Currency</span>

                  <strong>{destination.currency}</strong>
                </div>

                <div className="travel-info__item">
                  <span className="travel-info__label">Average budget</span>

                  <strong>{destination.budget}</strong>
                </div>
              </div>

              <button
                type="button"
                className={`travel-info__button ${
                  favorite ? "travel-info__button--active" : ""
                }`}
                onClick={handleFavoriteClick}
              >
                {favorite ? "♥ Saved to favorites" : "♡ Add to favorites"}
              </button>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

export default DestinationDetails;
