import { createContext, Dispatch, SetStateAction } from 'react';

export type Token = string | undefined;

interface IAuthContext {
  token: Token;
  setToken: Dispatch<SetStateAction<Token>>;
}

// TODO refactor to have handy methods (login, logout)
export const AuthContext = createContext<IAuthContext>({
  token: undefined,
  setToken: () => undefined,
});
