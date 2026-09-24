import { createContext, useContext, useEffect, useMemo, useState } from "react";

const TripsContext = createContext();

const STORAGE_KEY = "triply-trips";

function getInitialTrips() {
  try {
    const storedTrips = localStorage.getItem(STORAGE_KEY);

    if (!storedTrips) {
      return [];
    }

    const parsedTrips = JSON.parse(storedTrips);

    return Array.isArray(parsedTrips) ? parsedTrips : [];
  } catch {
    return [];
  }
}

export function TripsProvider({ children }) {
  const [trips, setTrips] = useState(getInitialTrips);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
  }, [trips]);

  const createTrip = (name) => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return null;
    }

    const newTrip = {
      id: Date.now(),
      name: trimmedName,
      destinations: [],
      createdAt: new Date().toISOString(),
    };

    setTrips((currentTrips) => [...currentTrips, newTrip]);

    return newTrip;
  };

  const addDestinationToTrip = (tripId, destination) => {
    setTrips((currentTrips) =>
      currentTrips.map((trip) => {
        if (trip.id !== tripId) {
          return trip;
        }

        const alreadyAdded = trip.destinations.some(
          (item) => item.id === destination.id,
        );

        if (alreadyAdded) {
          return trip;
        }

        return {
          ...trip,
          destinations: [...trip.destinations, destination],
        };
      }),
    );
  };

  const removeDestinationFromTrip = (tripId, destinationId) => {
    setTrips((currentTrips) =>
      currentTrips.map((trip) => ({
        ...trip,
        destinations: trip.destinations.filter(
          (destination) => destination.id !== destinationId,
        ),
      })),
    );
  };

  const deleteTrip = (tripId) => {
    setTrips((currentTrips) =>
      currentTrips.filter((trip) => trip.id !== tripId),
    );
  };

  const isDestinationInTrip = (tripId, destinationId) => {
    const trip = trips.find((item) => item.id === tripId);

    if (!trip) {
      return false;
    }

    return trip.destinations.some(
      (destination) => destination.id === destinationId,
    );
  };

  const getTripsContainingDestination = (destinationId) => {
    return trips.filter((trip) =>
      trip.destinations.some((destination) => destination.id === destinationId),
    );
  };

  const value = useMemo(
    () => ({
      trips,
      createTrip,
      addDestinationToTrip,
      removeDestinationFromTrip,
      deleteTrip,
      isDestinationInTrip,
      getTripsContainingDestination,
    }),
    [trips],
  );

  return (
    <TripsContext.Provider value={value}>{children}</TripsContext.Provider>
  );
}

export function useTrips() {
  const context = useContext(TripsContext);

  if (!context) {
    throw new Error("useTrips must be used inside TripsProvider");
  }

  return context;
}
