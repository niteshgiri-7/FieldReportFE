import { useEffect, useState } from "react";

export interface ILocation {
  latitude: number;
  longitude: number;
}

export const useGeolocation = () => {
  const [coords, setCoords] = useState<ILocation | null>(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setCoords({ latitude: 0, longitude: 0 });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
      () => setCoords({ latitude: 0, longitude: 0 }),
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 300_000 }
    );
  }, []);

  return coords;
};
