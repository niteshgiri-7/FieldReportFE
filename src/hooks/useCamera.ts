import { useEffect, useRef, useState } from "react";
import { getUserMediaWithFallback } from "../utils/getUserMedia";

type Facing = "user" | "environment";

export const useCamera = (isMobile: boolean, facing: Facing) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isMobile) return setLoading(false);

    const videoElement = videoRef.current; 
    let localStream: MediaStream;

    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const preferences: MediaStreamConstraints = {
          video: {
            facingMode: { ideal: facing },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        };
        const fallbacks: MediaStreamConstraints[] = [
          { video: { facingMode: { exact: facing } } },
          { video: true },
        ];
        const resStream = await getUserMediaWithFallback(
          preferences,
          fallbacks
        );
        setStream(resStream);
        localStream = resStream;

        if (videoElement) {
          if (videoElement.srcObject !== resStream) {
            videoElement.srcObject = resStream;
          }

          const handleCanPlay = () => {
            videoElement.play().catch((err) => {
              console.error("Play error:", err);
            });
          };

          videoElement.onloadedmetadata = handleCanPlay;
        }
      } catch (e) {
        if (e instanceof DOMException) setError(e.message || "Camera error");
        else setError("Unexpected Error Occurred!");
      } finally {
        setLoading(false);
      }
    };
    run();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      } else if (videoElement?.srcObject instanceof MediaStream) {
        (videoElement.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, [facing, isMobile]);

  const capture = (): string | null => {
    if (!canvasRef.current || !videoRef.current) return null;

    const video = videoRef.current;
    const scaleWidth = 300;
    const scaleHeight = (video.videoHeight / video.videoWidth) * scaleWidth;

    const canvas = canvasRef.current;
    canvas.width = scaleWidth;
    canvas.height = scaleHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.drawImage(video, 0, 0, scaleWidth, scaleHeight);
    return canvas.toDataURL("image/jpeg", 0.8);
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  return { videoRef, canvasRef, stream, loading, error, capture, stopCamera };
};
