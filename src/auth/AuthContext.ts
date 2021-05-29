import { createContext, Dispatch, SetStateAction } from 'react';

export type Token = string | undefined;

interface IAuthContext {
  token: Token;
  setToken: Dispatch<SetStateAction<Token>>;
  isLoggedIn: boolean;
  logout: VoidFunction;
}

export const AuthContext = createContext<IAuthContext>({
  token: undefined,
  setToken: () => undefined,
  isLoggedIn: false,
  logout: () => {},
});
