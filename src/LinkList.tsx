import { FunctionComponent } from 'react';
import { Link as LinkType } from './generated/graphql';
import { Link } from './Link';

const links: Omit<LinkType, 'votes'>[] = [
  {
    id: '1',
    description: 'Prisma gives you a powerful database toolkit 😎',
    url: 'https://prisma.io',
  },
  {
    id: '2',
    description: 'The best GraphQL client',
    url: 'https://www.apollographql.com/docs/react/',
  },
];

export const LinkList: FunctionComponent = () => (
  <>
    {links.map((link) => (
      <Link key={link.id} {...link} />
    ))}
  </>
);
