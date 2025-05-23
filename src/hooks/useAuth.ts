import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../apis/axiosInstance";
import { supabase } from "../config/supabase";
import { useUser } from "../context/getContext";
import type { ICredentials, IError } from "../types";

interface IRoleResponse {
  userRole: {
    data: {
      role: "user" | "admin" | "editor";
    };
  };
}

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<IError>({});
  const navigate = useNavigate();

  const signup = useCallback(async ({ email, password }: ICredentials) => {
    setLoading(true);
    setError({});


    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError((prev) => ({
        ...prev,
        name: error.name,
        message: error.message,
        status: error.code,
      }));
    } else {
      navigate("/login");
    }

    setLoading(false);
  }, [navigate]);

  return { signup, loading, error, setError };
};

export const useLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<IError>({});
  const { setUserId, setAccessToken, setRole, clearUser } = useUser();

  const login = useCallback(
    async ({ email, password }: ICredentials) => {
      setLoading(true);
      setError({});

      try {
        clearUser();
        const { data, error: loginError } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });

        if (loginError) {
          setError({
            name: loginError.name,
            message: loginError.message,
            isError: true,
          });
          return;
        }

        const userId = data.user?.id ?? null;
        if (!userId) {
          setError({ message: "User ID not found after login" });
          return;
        }

        setAccessToken(data.session.access_token);
        setUserId(userId);

        const { data: roleResponse } = await Axios.get<IRoleResponse>(
          `/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${data.session.access_token}`,
            },
          }
        );
        const role = roleResponse.userRole.data.role;
        setRole(role);
        navigate("/dashboard");
      } catch (err) {
        console.error("Login error", err);
        if (err instanceof Error)
          setError({
            name: err.name || "AxiosError",
            message: err.message || "Unknown error",
          });
      } finally {
        setLoading(false);
      }
    },
    [setUserId, setAccessToken, navigate, clearUser, setRole]
  );

  return { login, loading, error, setError };
};
