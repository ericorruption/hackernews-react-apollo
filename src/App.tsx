import { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router';

import { Header } from './Header';
import { routes } from './routes';
import { Login } from './auth/Login';
import { Logout } from './auth/Logout';
import { Signup } from './auth/Signup';
import { CreateLink } from './links/CreateLink';
import { LinkList } from './links/LinkList';
import { Search } from './links/Search';

const App: FunctionComponent = () => (
  <div className="center w85">
    <Header />
    <div className="ph3 pv1 background-gray">
      <Switch>
        <Route path={routes.signup}>
          <Signup />
        </Route>
        <Route path={routes.login}>
          <Login />
        </Route>
        <Route path={routes.logout}>
          <Logout />
        </Route>
        <Route path={routes.search}>
          <Search />
        </Route>
        <Route path={routes.createLink}>
          <CreateLink />
        </Route>
        <Route path={routes.top}>
          <LinkList />
        </Route>
        <Route path={routes.linkPage}>
          <LinkList />
        </Route>
        <Route exact path={routes.linkList}>
          {/* TODO redirect to /new/1 */}
          <LinkList />
        </Route>
      </Switch>
    </div>
  </div>
);

export default App;
