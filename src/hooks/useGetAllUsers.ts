import { useEffect, useState } from "react";
import Axios from "../apis/axiosInstance";
import { AxiosError } from "axios";
import type { IError } from "../types";

interface Users{
       user_id:string;
        email:string;
        role:"editor"|"admin"|"user"
}
interface IResponse{
    users:Users[]
}

export const useGetAllUsers = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allUsers, setAllUsers] = useState<Users[]>([]);
  const [error, setError] = useState<IError>({});

  const getAllUsers = async () => {
    try {
      setIsLoading(true);
      const { data } = await Axios.get<IResponse>("/users/all");
      setAllUsers(data.users)
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        setError((prev) => ({
          ...prev,
          isError: true,
          message: error.message,
          name: error.name,
        }));
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
     
  useEffect(()=>{
    const data =  getAllUsers();
    console.log(data,"again");
  },[])

  return {isLoading,error,allUsers};

};
