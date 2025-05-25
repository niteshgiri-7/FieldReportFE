import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../apis/axiosInstance";
import { useUser } from "../context/getContext";
import type { IError } from "../types";

export interface IReports {
  captured_at: string | Date;
  id: string;
  image_url: string;
  latitude: string;
  longitude: string;
  user_id: string;
}

interface IReportsResponse {
  photos: IReports[];
}

export const useReports = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reports, setReports] = useState<IReports[]>([]);
  const [error, setError] = useState<IError>({});
  const { accessToken, userId, clearUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const getMyReports = async () => {
      if (!accessToken || !userId) return;
      setIsLoading(true);
      try {
        const { data } = await Axios.get<IReportsResponse>("/photos", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setReports(data.photos);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.status === 401) {
            clearUser();
            return navigate("/login", { replace: true });
          }

          setError({
            name: error.name,
            message: error.message,
            isError: true,
          });
        }
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getMyReports();
  }, [accessToken, clearUser, navigate, userId]);

  return { reports, isLoading, error, setReports };
};
