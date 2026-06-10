import { useState, useEffect } from "react";

// Custom hook — tracks the user's live GPS location
// Uses browser's watchPosition — updates automatically whenever location changes
const useLiveLocation = () => {
  // liveLocation — stores current lat, lng, accuracy, and last update time
  // locationError — stores error message if something goes wrong
  const [liveLocation, setLiveLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    // Not all browsers support GPS — check first before doing anything
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return; // stop here, nothing else to do
    }

    // watchPosition is like setInterval but for location
    // It does not run once — it keeps watching and fires every time location changes
    // watchId is saved so we can stop watching later
    const watchId = navigator.geolocation.watchPosition(
      // SUCCESS — location came back fine
      (position) => {
        setLiveLocation({
          lat: position.coords.latitude, // how far north or south
          lng: position.coords.longitude, // how far east or west
          accuracy: position.coords.accuracy, // GPS accuracy in meters
          lastUpdated: new Date().toLocaleTimeString(), // time of last update
        });
        setLocationError(null); // clear any old error
      },

      // ERROR — something went wrong getting location
      (error) => {
        setLocationError("Unable to retrieve your location.");
        console.error("Location error:", error);
      },

      // OPTIONS — how we want the GPS to behave
      {
        enableHighAccuracy: true, // use full GPS, not just wifi/cell tower guessing
        timeout: 10000, // give up after 10 seconds if no location comes
        maximumAge: 0, // never use a cached location — always get fresh one
      },
    );

    // Cleanup — when component unmounts, stop watching location
    // Without this, GPS keeps running in the background even after leaving the page
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []); // empty array — run once when component mounts, never again

  // Return both values so any component can use them
  return { liveLocation, locationError };
};

export default useLiveLocation;
