import { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router';
import { CreateLink } from './CreateLink';
import { Header } from './Header';
import { LinkList } from './LinkList';
import { Login } from './auth/Login';
import { routes } from './routes';
import { Logout } from './auth/Logout';

const App: FunctionComponent = () => (
  <div className="center w85">
    <Header />
    <div className="ph3 pv1 background-gray">
      <Switch>
        <Route path={routes.login}>
          <Login />
        </Route>
        <Route path={routes.logout}>
          <Logout />
        </Route>
        <Route path={routes.createLink}>
          <CreateLink />
        </Route>
        <Route exact path={routes.linkList}>
          <LinkList />
        </Route>
      </Switch>
    </div>
  </div>
);

export default App;
