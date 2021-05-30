import { gql, useQuery } from '@apollo/client';
import { FunctionComponent } from 'react';
import { useParams, useRouteMatch } from 'react-router';
import { Query, QueryFeedArgs, Sort, Subscription } from '../generated/graphql';
import { routes } from '../routes';
import { Link } from './Link';

export type FeedQuery = Pick<Query, 'feed'>;

export const FEED_QUERY = gql`
  query FeedQuery($take: Int, $skip: Int, $orderBy: LinksOrderByInput) {
    feed(take: $take, skip: $skip, orderBy: $orderBy) {
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

const LINKS_PER_PAGE = 5;

export const LinkList: FunctionComponent = () => {
  const routeMatch = useRouteMatch();
  const params = useParams<{ page?: string }>();
  // TODO turn into separate page?
  const isTopPage = routeMatch.path === routes.top;
  const pageIndex = params.page
    ? (parseInt(params.page, 10) - 1) * LINKS_PER_PAGE
    : 0;

  const { data, subscribeToMore } = useQuery<FeedQuery, QueryFeedArgs>(
    FEED_QUERY,
    { variables: getFeedQueryVariables(isTopPage, pageIndex) }
  );

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

export const getFeedQueryVariables = (
  isTopPage: boolean,
  pageIndex: number
): QueryFeedArgs => ({
  skip: isTopPage ? 0 : pageIndex * LINKS_PER_PAGE,
  take: isTopPage ? 100 : LINKS_PER_PAGE,
  orderBy: { createdAt: Sort.Desc },
});
