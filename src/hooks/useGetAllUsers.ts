import { useEffect, useState } from "react";
import Axios from "../apis/axiosInstance";
import { AxiosError } from "axios";
import type { IError } from "../types";
import { useUser } from "../context/getContext";
import { useNavigate } from "react-router-dom";

interface Users {
  user_id: string;
  email: string;
  role: "editor" | "admin" | "user";
}
interface IResponse {
  users: Users[];
}

export const useGetAllUsers = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allUsers, setAllUsers] = useState<Users[]>([]);
  const [error, setError] = useState<IError>({});
  const { accessToken, userId } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    const getAllUsers = async () => {
      if (!accessToken || !userId) return;
      try {
        setIsLoading(true);
        const { data } = await Axios.get<IResponse>("/users/all", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setAllUsers(data.users);
      } catch (error) {
        if (error instanceof AxiosError) {
          setError((prev) => ({
            ...prev,
            isError: true,
            message: error.message,
            name: error.name,
          }));
          setIsLoading(false);
          if (error.status === 401)
            return navigate("/login", { replace: true });
        }
      } finally {
        setIsLoading(false);
      }
    };

    getAllUsers();
  }, [accessToken, userId, navigate]);

  return { isLoading, error, allUsers };
};
