import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
 
  const [user, setUser] = useState(null);

  
  const setUserDetails = (userData) => {
    setUser(userData);
  };

  
  const clearUserDetails = () => {
    setUser(null);
  };

  
  return (
    <UserContext.Provider value={{ user, setUserDetails, clearUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};
