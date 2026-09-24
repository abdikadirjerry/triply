import { useMemo, useState } from "react";
import DestinationCard from "../components/destinations/DestinationCard";
import destinations from "../data/destinations";
import "./Destinations.css";

function Destinations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");

  const countries = useMemo(() => {
    return [
      "All",
      ...new Set(destinations.map((destination) => destination.country)),
    ];
  }, []);

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(destinations.map((destination) => destination.category)),
    ];
  }, []);

  const filteredDestinations = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filtered = destinations.filter((destination) => {
      const matchesSearch =
        normalizedSearch === "" ||
        destination.name.toLowerCase().includes(normalizedSearch) ||
        destination.country.toLowerCase().includes(normalizedSearch) ||
        destination.category.toLowerCase().includes(normalizedSearch);

      const matchesCountry =
        selectedCountry === "All" || destination.country === selectedCountry;

      const matchesCategory =
        selectedCategory === "All" || destination.category === selectedCategory;

      return matchesSearch && matchesCountry && matchesCategory;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }

      if (sortBy === "newest") {
        return b.id - a.id;
      }

      return Number(b.popular) - Number(a.popular);
    });
  }, [searchTerm, selectedCountry, selectedCategory, sortBy]);

  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    selectedCountry !== "All" ||
    selectedCategory !== "All" ||
    sortBy !== "popular";

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCountry("All");
    setSelectedCategory("All");
    setSortBy("popular");
  };

  return (
    <main className="destinations-page">
      <section className="destinations-hero">
        <div className="container">
          <div className="destinations-hero__content">
            <span className="section__eyebrow">EXPLORE THE WORLD</span>

            <h1>Find your next destination</h1>

            <p>
              Discover inspiring places, plan unforgettable journeys, and find
              the destination that fits your travel style.
            </p>
          </div>
        </div>
      </section>

      <section className="destinations-section">
        <div className="container">
          <div className="destinations-toolbar">
            <div className="destinations-search">
              <span className="destinations-search__icon" aria-hidden="true">
                🔎
              </span>

              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search destinations..."
                aria-label="Search destinations"
              />

              {searchTerm && (
                <button
                  type="button"
                  className="destinations-search__clear"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <div className="destinations-sort">
              <label htmlFor="destination-sort">Sort by</label>

              <select
                id="destination-sort"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
              >
                <option value="popular">Popular</option>
                <option value="rating">Highest rated</option>
                <option value="name">Name A–Z</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          <div className="destinations-filters">
            <div className="destinations-filter-group">
              <span className="destinations-filter-group__label">Country</span>

              <div className="destinations-filter-options">
                {countries.map((country) => (
                  <button
                    type="button"
                    key={country}
                    className={`destination-filter ${
                      selectedCountry === country
                        ? "destination-filter--active"
                        : ""
                    }`}
                    onClick={() => setSelectedCountry(country)}
                  >
                    {country}
                  </button>
                ))}
              </div>
            </div>

            <div className="destinations-filter-group">
              <span className="destinations-filter-group__label">Category</span>

              <div className="destinations-filter-options">
                {categories.map((category) => (
                  <button
                    type="button"
                    key={category}
                    className={`destination-filter ${
                      selectedCategory === category
                        ? "destination-filter--active"
                        : ""
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="destinations-results-header">
            <div>
              <p className="destinations-results-header__count">
                {filteredDestinations.length}{" "}
                {filteredDestinations.length === 1
                  ? "destination"
                  : "destinations"}
              </p>

              <p className="destinations-results-header__text">
                {hasActiveFilters
                  ? "Matching your current filters"
                  : "Explore all destinations"}
              </p>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                className="destinations-clear"
                onClick={clearFilters}
              >
                Clear all filters
              </button>
            )}
          </div>

          {hasActiveFilters && (
            <div className="destinations-active-filters">
              {searchTerm.trim() && (
                <span className="active-filter">
                  Search: "{searchTerm.trim()}"
                </span>
              )}

              {selectedCountry !== "All" && (
                <span className="active-filter">
                  Country: {selectedCountry}
                </span>
              )}

              {selectedCategory !== "All" && (
                <span className="active-filter">
                  Category: {selectedCategory}
                </span>
              )}

              {sortBy !== "popular" && (
                <span className="active-filter">
                  Sorted by:{" "}
                  {sortBy === "rating"
                    ? "Highest rated"
                    : sortBy === "name"
                      ? "Name A–Z"
                      : "Newest"}
                </span>
              )}
            </div>
          )}

          {filteredDestinations.length > 0 ? (
            <div className="destinations-grid">
              {filteredDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                />
              ))}
            </div>
          ) : (
            <div className="destinations-empty">
              <span className="destinations-empty__icon">🌍</span>

              <h2>No destinations found</h2>

              <p>Try changing your search or removing one of your filters.</p>

              <button type="button" onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Destinations;
