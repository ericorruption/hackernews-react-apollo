import Cookies from 'js-cookie';
import { FunctionComponent, useEffect, useState } from 'react';
import { AuthContext, Token } from './AuthContext';

export const AUTH_TOKEN = 'AUTH_TOKEN';

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [token, setToken] = useState<Token>(Cookies.get(AUTH_TOKEN));

  useEffect(() => {
    if (token) {
      Cookies.set(AUTH_TOKEN, token);
    } else {
      Cookies.remove(AUTH_TOKEN);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        isLoggedIn: !!token,
        logout: () => setToken(undefined),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
