import { useState } from "react";
import DestinationCard from "../components/destinations/DestinationCard";
import destinations from "../data/destinations";

function Destinations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const countries = [
    "All",
    ...new Set(destinations.map((destination) => destination.country)),
  ];

  const categories = [
    "All",
    ...new Set(destinations.map((destination) => destination.category)),
  ];

  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch =
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCountry =
      selectedCountry === "All" || destination.country === selectedCountry;

    const matchesCategory =
      selectedCategory === "All" || destination.category === selectedCategory;

    return matchesSearch && matchesCountry && matchesCategory;
  });

  return (
    <main>
      <section className="destinations-header">
        <div className="container">
          <span className="section__eyebrow">EXPLORE THE WORLD</span>

          <h1 className="destinations-header__title">
            Find your next destination
          </h1>

          <p className="destinations-header__description">
            Discover beautiful places, exciting experiences, and destinations
            worth adding to your next adventure.
          </p>
        </div>
      </section>

      <section className="destinations-section">
        <div className="container">
          <div className="destination-filters">
            <div className="destination-search">
              <label htmlFor="destination-search">Search destinations</label>

              <input
                id="destination-search"
                type="text"
                placeholder="Search by destination or country..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>

            <div className="destination-filter">
              <label htmlFor="country-filter">Country</label>

              <select
                id="country-filter"
                value={selectedCountry}
                onChange={(event) => setSelectedCountry(event.target.value)}
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div className="destination-filter">
              <label htmlFor="category-filter">Category</label>

              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="destinations-results-header">
            <div>
              <h2>Explore destinations</h2>

              <p>
                Showing {filteredDestinations.length}{" "}
                {filteredDestinations.length === 1
                  ? "destination"
                  : "destinations"}
              </p>
            </div>
          </div>

          {filteredDestinations.length > 0 ? (
            <div className="destination-grid">
              {filteredDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                />
              ))}
            </div>
          ) : (
            <div className="destination-empty">
              <div className="destination-empty__icon">🌍</div>

              <h2>No destinations found</h2>

              <p>Try changing your search or selecting different filters.</p>

              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCountry("All");
                  setSelectedCategory("All");
                }}
              >
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
