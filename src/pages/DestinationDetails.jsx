import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import destinations from "../data/destinations";
import { useTrips } from "../context/useTrips";

function DestinationDetails() {
  const { slug } = useParams();

  const destination = destinations.find((item) => item.slug === slug);

  const {
    trips,
    createTrip,
    addDestinationToTrip,
    getTripsContainingDestination,
  } = useTrips();

  const [showTripPanel, setShowTripPanel] = useState(false);
  const [newTripName, setNewTripName] = useState("");

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

  const destinationTrips = getTripsContainingDestination(destination.id);

  const handleAddToTrip = (tripId) => {
    addDestinationToTrip(tripId, destination);
    setShowTripPanel(false);
  };

  const handleCreateTrip = (event) => {
    event.preventDefault();

    const trip = createTrip(newTripName);

    if (!trip) {
      return;
    }

    addDestinationToTrip(trip.id, destination);

    setNewTripName("");
    setShowTripPanel(false);
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

              {destinationTrips.length > 0 && (
                <div className="travel-info__saved">
                  <span>✓</span>

                  <div>
                    <strong>Added to your trips</strong>

                    <p>
                      {destinationTrips.length === 1
                        ? destinationTrips[0].name
                        : `${destinationTrips.length} trips`}
                    </p>
                  </div>
                </div>
              )}

              <button
                type="button"
                className="travel-info__button"
                onClick={() => setShowTripPanel((current) => !current)}
              >
                {showTripPanel ? "Close trip planner" : "Add to my trip"}
              </button>

              {showTripPanel && (
                <div className="trip-planner">
                  <div className="trip-planner__header">
                    <span className="section__eyebrow">PLAN YOUR JOURNEY</span>

                    <h3>Add {destination.name}</h3>

                    <p>Choose an existing trip or create a new one.</p>
                  </div>

                  {trips.length > 0 && (
                    <div className="trip-planner__existing">
                      <h4>Your trips</h4>

                      <div className="trip-planner__list">
                        {trips.map((trip) => {
                          const alreadyAdded = destinationTrips.some(
                            (item) => item.id === trip.id,
                          );

                          return (
                            <button
                              type="button"
                              className="trip-option"
                              key={trip.id}
                              disabled={alreadyAdded}
                              onClick={() => handleAddToTrip(trip.id)}
                            >
                              <span className="trip-option__icon">🧳</span>

                              <span className="trip-option__content">
                                <strong>{trip.name}</strong>

                                <small>
                                  {trip.destinations.length}{" "}
                                  {trip.destinations.length === 1
                                    ? "destination"
                                    : "destinations"}
                                </small>
                              </span>

                              <span className="trip-option__action">
                                {alreadyAdded ? "Added" : "Add"}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="trip-planner__create">
                    <h4>Create a new trip</h4>

                    <form onSubmit={handleCreateTrip}>
                      <input
                        type="text"
                        value={newTripName}
                        onChange={(event) => setNewTripName(event.target.value)}
                        placeholder="e.g. Summer in Europe"
                        aria-label="New trip name"
                      />

                      <button type="submit">Create trip</button>
                    </form>
                  </div>

                  <Link to="/trips" className="trip-planner__link">
                    View all my trips →
                  </Link>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

export default DestinationDetails;
