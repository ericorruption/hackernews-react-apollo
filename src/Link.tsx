import type { FunctionComponent } from 'react';
import type { Link as LinkType } from './generated/graphql';

export const Link: FunctionComponent<Omit<LinkType, 'votes'>> = ({
  description,
  url,
}) => (
  <div>
    {description} ({url})
  </div>
);
