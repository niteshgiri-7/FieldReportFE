import { useState, type ReactNode } from "react";
import { UserContext } from "./userContext";

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null | undefined>(localStorage.getItem("userId") || undefined);
  const [accessToken, setAccessToken] = useState<string | null | undefined>(localStorage.getItem("accessToken") || undefined);
  const [role, setRole] = useState<"user" | "editor" | "admin">((localStorage.getItem("role") as "user" | "editor" | "admin") || "user" );

  const handleSetUserId = (userId: string) => {
    setUserId(userId);
    localStorage.setItem("userId", userId);
  };

  const handleSetAccessToken = (token: string) => {
    setAccessToken(token);
    localStorage.setItem("accessToken", token);
  };

  const handleClearUser = () => {
    setUserId(null);
    setAccessToken(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("accessToken");
  };

  const handleSetRole = (role: "user" | "editor" | "admin") => {
    setRole(role);
    localStorage.setItem("role", role);
  }

  return (
    <UserContext.Provider
      value={{
        userId,
        role,
        accessToken,
        setUserId: handleSetUserId,
        setAccessToken: handleSetAccessToken,
        clearUser: handleClearUser,
        setRole: handleSetRole,

      }}
    >
      {children}
    </UserContext.Provider>
  );
};


