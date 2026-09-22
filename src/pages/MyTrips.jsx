import { useState } from "react";
import { Link } from "react-router-dom";
import { useTrips } from "../context/TripsContext";
import destinations from "../data/destinations";

function MyTrips() {
  const { trips, addTrip, deleteTrip, removeDestinationFromTrip } = useTrips();

  const [tripName, setTripName] = useState("");
  const [tripDate, setTripDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = tripName.trim();

    if (!trimmedName || !tripDate) {
      return;
    }

    addTrip({
      name: trimmedName,
      date: tripDate,
    });

    setTripName("");
    setTripDate("");
  };

  const formatDate = (date) => {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className="trips-page">
      <section className="trips-page__hero">
        <div className="container">
          <span className="section__eyebrow">YOUR TRAVEL PLANS</span>

          <h1>My trips</h1>

          <p>
            Organize your destinations and build your next adventure in one
            place.
          </p>
        </div>
      </section>

      <section className="trips-page__content">
        <div className="container">
          <div className="trip-create">
            <div className="trip-create__header">
              <span className="section__eyebrow">CREATE A TRIP</span>

              <h2>Plan your next adventure</h2>

              <p>
                Give your trip a name and choose your travel date to get
                started.
              </p>
            </div>

            <form className="trip-create__form" onSubmit={handleSubmit}>
              <div className="trip-form__group">
                <label htmlFor="trip-name">Trip name</label>

                <input
                  id="trip-name"
                  type="text"
                  value={tripName}
                  onChange={(event) => setTripName(event.target.value)}
                  placeholder="e.g. Summer in Europe"
                />
              </div>

              <div className="trip-form__group">
                <label htmlFor="trip-date">Travel date</label>

                <input
                  id="trip-date"
                  type="date"
                  value={tripDate}
                  onChange={(event) => setTripDate(event.target.value)}
                />
              </div>

              <button type="submit" className="trip-create__button">
                Create trip
              </button>
            </form>
          </div>

          {trips.length > 0 && (
            <div className="trips-list">
              <div className="trips-list__header">
                <div>
                  <span className="section__eyebrow">YOUR COLLECTION</span>

                  <h2>
                    {trips.length} {trips.length === 1 ? "trip" : "trips"}
                  </h2>
                </div>

                <Link to="/destinations" className="trips-list__browse">
                  Explore destinations →
                </Link>
              </div>

              <div className="trip-cards">
                {trips.map((trip) => {
                  const tripDestinations = destinations.filter((destination) =>
                    trip.destinations.includes(destination.id),
                  );

                  return (
                    <article className="trip-card" key={trip.id}>
                      <div className="trip-card__header">
                        <div>
                          <span className="trip-card__label">TRIP</span>

                          <h3>{trip.name}</h3>

                          <p>📅 {formatDate(trip.date)}</p>
                        </div>

                        <div className="trip-card__actions">
                          <span className="trip-card__count">
                            {tripDestinations.length}{" "}
                            {tripDestinations.length === 1 ? "place" : "places"}
                          </span>

                          <button
                            type="button"
                            className="trip-card__delete"
                            onClick={() => deleteTrip(trip.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      {tripDestinations.length > 0 ? (
                        <div className="trip-card__destinations">
                          {tripDestinations.map((destination) => (
                            <div
                              className="trip-destination"
                              key={destination.id}
                            >
                              <img
                                src={destination.image}
                                alt={destination.name}
                              />

                              <div className="trip-destination__info">
                                <h4>{destination.name}</h4>

                                <p>{destination.country}</p>
                              </div>

                              <button
                                type="button"
                                className="trip-destination__remove"
                                onClick={() =>
                                  removeDestinationFromTrip(
                                    trip.id,
                                    destination.id,
                                  )
                                }
                                aria-label={`Remove ${destination.name} from ${trip.name}`}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="trip-card__empty">
                          <span>🌍</span>

                          <p>No destinations added yet.</p>

                          <Link to="/destinations">Add destinations →</Link>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          )}

          {trips.length === 0 && (
            <div className="trips-empty">
              <div className="trips-empty__icon">🧳</div>

              <span className="section__eyebrow">NO TRIPS YET</span>

              <h2>Your next adventure starts here</h2>

              <p>
                Create your first trip above and start adding destinations to
                your travel plan.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default MyTrips;
