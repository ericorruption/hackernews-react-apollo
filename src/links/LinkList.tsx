import { gql, useQuery } from '@apollo/client';
import { FunctionComponent } from 'react';
import { Query, Subscription } from '../generated/graphql';
import { Link } from './Link';

export type FeedQuery = Pick<Query, 'feed'>;

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

const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    newVote {
      id
      link {
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
      user {
        id
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

  subscribeToMore({
    document: NEW_VOTES_SUBSCRIPTION,
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
