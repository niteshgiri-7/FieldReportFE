
export const getUserMediaWithFallback= async (preferred: MediaStreamConstraints,fallbacks: MediaStreamConstraints[]): Promise<MediaStream>=> {
  const { mediaDevices } = navigator;
  if (!mediaDevices || !mediaDevices.getUserMedia)
    throw new Error("Your browser doesn't support camera");

  try {
    return await mediaDevices.getUserMedia(preferred);
  } catch (error) {
    let last = error;
    for (const constraints of fallbacks) {
      try {
        return await mediaDevices.getUserMedia(constraints);
      } catch (error) {
        last = error;
      }
    }
    throw last;
  }
}
