import { createContext, useState } from "react";

// eslint-disable-next-line
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [baseUrl, setBaseUrl] = useState("");

  return (
    <UserContext.Provider value={{ baseUrl, setBaseUrl }}>
      {children}
    </UserContext.Provider>
  );
};
