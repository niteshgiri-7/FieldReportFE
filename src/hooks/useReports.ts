import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Axios from "../apis/axiosInstance";
import type { IError } from "../types";
import { useUser } from "../context/getContext";

export interface IReports {
  captured_at: string|Date;
  id: string;
  image_url: string;
  latitude: string;
  longitude: string;
  user_id: string;
}

interface IReportsResponse{
    photos:IReports[]
}

export const useReports = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reports, setReports] = useState<IReports[]>([]);
  const [error, setError] = useState<IError>({});
  const {accessToken,userId}=useUser();

  const getMyReports = async () => {
    setIsLoading(true);
    try {
      const { data } = await Axios.get<IReportsResponse>("/photos");
      console.log(data.photos);
      setReports(data.photos);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError({
          name: error.name,
          message: error.message,
          isError:true
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyReports();
  }, [accessToken,userId]);

  return { reports, isLoading, error ,setReports };
};
