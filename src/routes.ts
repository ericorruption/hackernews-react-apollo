type RouteName = string;
type Path = string;

export const routes: Record<RouteName, Path> = {
  linkList: '/',
  createLink: '/create',
  login: '/login',
  logout: '/logout',
  signup: '/signup',
};
