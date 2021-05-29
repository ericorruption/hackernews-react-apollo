import { gql, useQuery } from '@apollo/client';
import { FunctionComponent } from 'react';
import { Query } from './generated/graphql';
import { Link } from './Link';

const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        url
        createdAt
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

export const LinkList: FunctionComponent = () => {
  const { data } = useQuery<Pick<Query, 'feed'>>(FEED_QUERY);

  return (
    <>
      {data &&
        data.feed.links.map((link, index) => (
          <Link key={link.id} index={index} link={link} />
        ))}
    </>
  );
};
