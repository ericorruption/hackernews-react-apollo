import { Link } from 'react-router-dom';
import { FunctionComponent, useContext } from 'react';
import { routes } from './routes';
import { AuthContext } from './auth/AuthContext';

export const Header: FunctionComponent = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <div className="fw7 mr1">Hacker News</div>
        <Link to={routes.linkList} className="ml1 no-underline black">
          new
        </Link>
        <div className="ml1">|</div>
        <Link to={routes.top} className="ml1 no-underline black">
          top
        </Link>
        <div className="ml1">|</div>
        <Link to={routes.search} className="ml1 no-underline black">
          search
        </Link>
        {isLoggedIn && (
          <div className="flex">
            <div className="ml1">|</div>
            <Link to={routes.createLink} className="ml1 no-underline black">
              submit
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-fixed">
        {isLoggedIn ? (
          <Link to={routes.logout} className="ml1 no-underline black">
            logout
          </Link>
        ) : (
          <Link to={routes.login} className="ml1 no-underline black">
            login
          </Link>
        )}
      </div>
    </div>
  );
};
