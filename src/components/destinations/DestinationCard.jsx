import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";

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
      <div className="destination-card__image-wrapper">
        <Link to={`/destinations/${destination.slug}`}>
          <img
            className="destination-card__image"
            src={destination.image}
            alt={destination.name}
          />
        </Link>

        <span className="destination-card__category">
          {destination.category}
        </span>

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
        >
          {favorite ? "♥" : "♡"}
        </button>
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

        <Link
          to={`/destinations/${destination.slug}`}
          className="destination-card__link"
        >
          Explore destination →
        </Link>
      </div>
    </article>
  );
}

export default DestinationCard;
