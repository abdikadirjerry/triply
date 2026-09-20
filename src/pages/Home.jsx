function Home() {
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
    </main>
  );
}

export default Home;
