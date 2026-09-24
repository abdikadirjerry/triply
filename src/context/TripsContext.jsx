import { useCallback, useEffect, useMemo, useState } from "react";
import { TripsContext } from "./TripsContext";

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

  const createTrip = useCallback((name) => {
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
  }, []);

  const addDestinationToTrip = useCallback((tripId, destination) => {
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
  }, []);

  const removeDestinationFromTrip = useCallback((tripId, destinationId) => {
    setTrips((currentTrips) =>
      currentTrips.map((trip) => ({
        ...trip,
        destinations: trip.destinations.filter(
          (destination) => destination.id !== destinationId,
        ),
      })),
    );
  }, []);

  const deleteTrip = useCallback((tripId) => {
    setTrips((currentTrips) =>
      currentTrips.filter((trip) => trip.id !== tripId),
    );
  }, []);

  const isDestinationInTrip = useCallback(
    (tripId, destinationId) => {
      const trip = trips.find((item) => item.id === tripId);

      if (!trip) {
        return false;
      }

      return trip.destinations.some(
        (destination) => destination.id === destinationId,
      );
    },
    [trips],
  );

  const getTripsContainingDestination = useCallback(
    (destinationId) => {
      return trips.filter((trip) =>
        trip.destinations.some(
          (destination) => destination.id === destinationId,
        ),
      );
    },
    [trips],
  );

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
    [
      trips,
      createTrip,
      addDestinationToTrip,
      removeDestinationFromTrip,
      deleteTrip,
      isDestinationInTrip,
      getTripsContainingDestination,
    ],
  );

  return (
    <TripsContext.Provider value={value}>{children}</TripsContext.Provider>
  );
}
