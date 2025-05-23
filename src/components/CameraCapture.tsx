
import { useState } from "react";
import { useGeolocation } from "../hooks/useGeoLocation";
import { useCamera } from "../hooks/useCamera";
import { saveImage } from "../apis/saveImage";


interface Props {
  onCapture: (img: string, loc: { latitude: number; longitude: number }) => void;
  onCancel: () => void;
}

const hasWebcamSupport = !!navigator.mediaDevices?.getUserMedia;


const CameraCapture: React.FC<Props> = ({ onCapture, onCancel }) => {
  const [facing, setFacing] = useState<"user" | "environment">("environment");
  const co_ordinates = useGeolocation();
  const { videoRef, canvasRef, loading, error, capture, stopCamera } = useCamera(!hasWebcamSupport, facing);

  const handleCapture = () => {
    const img = capture();
    if (img && co_ordinates) {
      onCapture(img, co_ordinates);
      saveImage(img, co_ordinates);
    }
  };

  const handleCancel = () => {
    stopCamera();
    onCancel();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white p-6 rounded w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold text-center">Capture Image</h2>

        {error && <p className="text-red-600 text-center">{error}</p>}

        {/* Desktop camera */}
        {hasWebcamSupport && (
          <>
            <video ref={videoRef} className="w-full rounded" playsInline autoPlay muted />
            <canvas ref={canvasRef} className="hidden" />
            {loading ? (
              <p className="text-center text-gray-500">Loading camera…</p>
            ) : (
              <div className="flex justify-center gap-3">
                <button className="btn" onClick={handleCapture}>📸 Capture</button>
                <button className="btn" onClick={() => setFacing(facing === "user" ? "environment" : "user")}>
                  🔄 Flip
                </button>
                <button className="btn" onClick={onCancel}>Cancel</button>
              </div>
            )}
          </>
        )}

        {/* Mobile fallback */}
        {!hasWebcamSupport && (
          <>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={async e => {
                const file = e.target.files?.[0];
                if (!file || !co_ordinates) return;
                const dataUrl = await fileToDataUrl(file);
                onCapture(dataUrl, co_ordinates);
              }}
              className="hidden"
              id="mobileFile"
            />
            <label htmlFor="mobileFile" className="btn w-full text-center">📸 Take Photo</label>
            <button className="btn w-full" onClick={handleCancel}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;


const fileToDataUrl = (file: File) =>
  new Promise<string>(res => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result as string);
    reader.readAsDataURL(file);
  });


