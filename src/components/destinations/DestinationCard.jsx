import { Link } from "react-router-dom";
import { useFavorites } from "../../context/useFavorites";
import "./DestinationCard.css";

function DestinationCard({ destination }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const favorite = isFavorite(destination.id);

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    toggleFavorite(destination.id);
  };

  return (
    <article className="destination-card">
      <Link
        to={`/destinations/${destination.slug}`}
        className="destination-card__link"
        aria-label={`View ${destination.name} destination`}
      >
        <div className="destination-card__image-wrapper">
          <img
            src={destination.image}
            alt={`${destination.name}, ${destination.country}`}
            className="destination-card__image"
          />

          <button
            type="button"
            className={`destination-card__favorite ${
              favorite ? "destination-card__favorite--active" : ""
            }`}
            onClick={handleFavoriteClick}
            aria-label={
              favorite
                ? `Remove ${destination.name} from favorites`
                : `Add ${destination.name} to favorites`
            }
            aria-pressed={favorite}
          >
            {favorite ? "♥" : "♡"}
          </button>

          {destination.popular && (
            <span className="destination-card__badge">Popular</span>
          )}
        </div>

        <div className="destination-card__content">
          <div className="destination-card__top">
            <div>
              <p className="destination-card__country">{destination.country}</p>

              <h3>{destination.name}</h3>
            </div>

            <span
              className="destination-card__rating"
              aria-label={`Rating ${destination.rating} out of 5`}
            >
              ★ {destination.rating}
            </span>
          </div>

          <p className="destination-card__description">
            {destination.description}
          </p>

          <div className="destination-card__footer">
            <span>{destination.category}</span>

            <span className="destination-card__view">View destination →</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default DestinationCard;
