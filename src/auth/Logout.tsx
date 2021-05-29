import { FunctionComponent, useContext } from 'react';
import { Redirect } from 'react-router';
import { routes } from '../routes';
import { AuthContext } from './AuthContext';

export const Logout: FunctionComponent = () => {
  const { logout } = useContext(AuthContext);

  logout();

  return <Redirect to={routes.linkList} />;
};
