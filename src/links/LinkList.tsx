import { gql, useQuery } from '@apollo/client';
import { FunctionComponent } from 'react';
import { Query } from '../generated/graphql';
import { Link } from './Link';

export const FEED_QUERY = gql`
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

export type FeedQuery = Pick<Query, 'feed'>;

export const LinkList: FunctionComponent = () => {
  const { data } = useQuery<FeedQuery>(FEED_QUERY);

  return (
    <>
      {data &&
        data.feed.links.map((link, index) => (
          <Link key={link.id} index={index} link={link} />
        ))}
    </>
  );
};
