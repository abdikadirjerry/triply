import { createContext, useContext, useEffect, useState } from "react";

const TripsContext = createContext();

const TRIPS_STORAGE_KEY = "triply-trips";

export function TripsProvider({ children }) {
  const [trips, setTrips] = useState(() => {
    try {
      const savedTrips = localStorage.getItem(TRIPS_STORAGE_KEY);

      return savedTrips ? JSON.parse(savedTrips) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(trips));
  }, [trips]);

  const addTrip = (trip) => {
    setTrips((currentTrips) => [
      ...currentTrips,
      {
        ...trip,
        id: Date.now(),
        destinations: [],
      },
    ]);
  };

  const deleteTrip = (tripId) => {
    setTrips((currentTrips) =>
      currentTrips.filter((trip) => trip.id !== tripId),
    );
  };

  const addDestinationToTrip = (tripId, destinationId) => {
    setTrips((currentTrips) =>
      currentTrips.map((trip) => {
        if (trip.id !== tripId) {
          return trip;
        }

        if (trip.destinations.includes(destinationId)) {
          return trip;
        }

        return {
          ...trip,
          destinations: [...trip.destinations, destinationId],
        };
      }),
    );
  };

  const removeDestinationFromTrip = (tripId, destinationId) => {
    setTrips((currentTrips) =>
      currentTrips.map((trip) => {
        if (trip.id !== tripId) {
          return trip;
        }

        return {
          ...trip,
          destinations: trip.destinations.filter((id) => id !== destinationId),
        };
      }),
    );
  };

  const value = {
    trips,
    addTrip,
    deleteTrip,
    addDestinationToTrip,
    removeDestinationFromTrip,
  };

  return (
    <TripsContext.Provider value={value}>{children}</TripsContext.Provider>
  );
}

export function useTrips() {
  const context = useContext(TripsContext);

  if (!context) {
    throw new Error("useTrips must be used inside a TripsProvider");
  }

  return context;
}
