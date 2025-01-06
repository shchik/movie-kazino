import { createContext } from "react";

interface AuthContextType {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultContextValue: AuthContextType = {
  isAuth: false,
  setIsAuth: () => {},
};

export const context = createContext<AuthContextType>(defaultContextValue);
