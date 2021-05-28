import { Link } from 'react-router-dom';
import { FunctionComponent } from 'react';
import { routes } from './routes';

export const Header: FunctionComponent = () => (
  <div className="flex pa1 justify-between nowrap orange">
    <div className="flex flex-fixed black">
      <div className="fw7 mr1">Hacker News</div>
      <Link to={routes.linkList} className="ml1 no-underline black">
        new
      </Link>
      <div className="ml1">|</div>
      <Link to={routes.createLink} className="ml1 no-underline black">
        submit
      </Link>
    </div>
  </div>
);
