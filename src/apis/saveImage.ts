
import toast from "react-hot-toast";
import Axios from "./axiosInstance";

type Location = {
  latitude: number;
  longitude: number;
};

type UploadUrlResponse = {
  uploadUrl: string;
  filePath: string;
};

type SavePhotoResponse = {
  photo: {
    id: number;
    user_id: string;
    image_url: string;
    latitude: number | null;
    longitude: number | null;
    created_at: string;
  };
};

export const saveImage = async (
  imageDataUrl: string,
  location: Location
): Promise<SavePhotoResponse["photo"] | undefined> => {
  try {
    const blob = await (await fetch(imageDataUrl)).blob();
    const fileExtension = imageDataUrl.includes("image/png") ? "png" : "jpg";

    const { data: uploadData } = await Axios.get<UploadUrlResponse>(
      `/photos/upload-url`,
      {
        params: { fileExtension },
        withCredentials: true,
      }
    );

    await Axios.put(uploadData.uploadUrl, blob, {
      headers: {
        "Content-Type": `image/${fileExtension}`,
      },
    });

    const { data: photoData } = await Axios.post<SavePhotoResponse>(
      "/photos",
      {
        image_url: uploadData.filePath,
        latitude: location.latitude,
        longitude: location.longitude,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return photoData.photo;
  } catch (error) {
    console.log(error)
    toast.error("Upload failed. Please try again.");
  }
};
