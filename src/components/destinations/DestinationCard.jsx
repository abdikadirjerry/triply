function DestinationCard({ destination }) {
  return (
    <article className="destination-card">
      <div className="destination-card__image-wrapper">
        <img
          className="destination-card__image"
          src={destination.image}
          alt={destination.name}
        />

        <span className="destination-card__category">
          {destination.category}
        </span>
      </div>

      <div className="destination-card__content">
        <div className="destination-card__heading">
          <div>
            <h3 className="destination-card__name">{destination.name}</h3>

            <p className="destination-card__country">{destination.country}</p>
          </div>

          <span className="destination-card__rating">
            ★ {destination.rating}
          </span>
        </div>

        <p className="destination-card__description">
          {destination.description}
        </p>

        <button type="button" className="destination-card__link">
          Explore destination →
        </button>
      </div>
    </article>
  );
}

export default DestinationCard;
