import { useContext } from "react";
import { TripsContext } from "./TripsContext";

export function useTrips() {
  const context = useContext(TripsContext);

  if (!context) {
    throw new Error("useTrips must be used inside TripsProvider");
  }

  return context;
}
