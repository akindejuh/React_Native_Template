import React, { useEffect, useState } from 'react';
import { AuthContext, IAuthProvider } from './interfaces';

export const AuthProvider: IAuthProvider = function AuthProvider({ children }) {
  const [render, setRender] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setRender(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}>
      {render ? children : null}
    </AuthContext.Provider>
  );
};
