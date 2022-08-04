import React, { createContext, useContext, useState } from "react";

const AccountContext = createContext(null);

export const AccountProvider = ({ children }) => {
  const [profile, setProfile] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticate = () => {
    setIsAuthenticated(true);
  };

  const setUser = (user) => {
    setProfile(user);
  };

  const logout = () => {
    setProfile(undefined);
    setIsAuthenticated(false);
  };
  return (
    <AccountContext.Provider
      value={{ user: profile, setUser, isAuthenticated, authenticate, logout }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => useContext(AccountContext);
