import React, { useState } from 'react';

const UserContext = React.createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    email: '',
    username: ''
  });

  const value = { user, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContext;