import { createContext } from "react";

export interface UserContextType {
  userId: string | null|undefined;
  role:"user"|"editor"|"admin";
  accessToken: string | null|undefined;
  setUserId: (userId: string) => void;
  setAccessToken: (token: string) => void;
  clearUser: () => void;
  setRole:(role: "user" | "editor" | "admin") => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);




