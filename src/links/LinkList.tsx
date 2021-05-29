import { gql, useQuery } from '@apollo/client';
import { FunctionComponent } from 'react';
import { Query, Subscription } from '../generated/graphql';
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

const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    newLink {
      id
      url
      description
      createdAt
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
`;

export const LinkList: FunctionComponent = () => {
  const { data, subscribeToMore } = useQuery<FeedQuery>(FEED_QUERY);

  subscribeToMore<Pick<Subscription, 'newLink'>>({
    document: NEW_LINKS_SUBSCRIPTION,
    updateQuery: (previousQueryResult, { subscriptionData }) => {
      const newLink = subscriptionData.data.newLink;

      if (!newLink) {
        return previousQueryResult;
      }

      const exists = previousQueryResult.feed.links.find(
        (link) => link.id === newLink.id
      );
      if (exists) {
        return previousQueryResult;
      }

      return {
        feed: {
          links: [newLink, ...previousQueryResult.feed.links],
          count: previousQueryResult.feed.count + 1,
          // __typename
        },
      };
    },
  });

  return (
    <>
      {data &&
        data.feed.links.map((link, index) => (
          <Link key={link.id} index={index} link={link} />
        ))}
    </>
  );
};
