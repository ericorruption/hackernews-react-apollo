import { gql, useQuery } from '@apollo/client';
import { FunctionComponent } from 'react';
import { useParams, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { Query, QueryFeedArgs, Sort, Subscription } from '../generated/graphql';
import { routes } from '../routes';
import { Link as LinkItem } from './Link';

export type FeedQuery = Pick<Query, 'feed'>;

export const FEED_QUERY = gql`
  query FeedQuery($take: Int, $skip: Int, $orderBy: LinksOrderByInput) {
    feed(take: $take, skip: $skip, orderBy: $orderBy) {
      count
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
  const pageIndex = params.page ? parseInt(params.page, 10) - 1 : 0;

  const { loading, error, data, subscribeToMore } = useQuery<
    FeedQuery,
    QueryFeedArgs
  >(FEED_QUERY, { variables: getFeedQueryVariables(isTopPage, pageIndex) });

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

  const displayNextLink =
    (data?.feed.count ?? 0) / LINKS_PER_PAGE > pageIndex + 1;

  return (
    <>
      {loading && <p>Loading&hellip;</p>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data &&
        isTopPage &&
        [...data.feed.links]
          .sort((a, b) => b.votes.length - a.votes.length)
          .map((link, index) => (
            <LinkItem key={link.id} index={index} link={link} />
          ))}
      {data &&
        !isTopPage &&
        data.feed.links.map((link, index) => (
          <LinkItem key={link.id} index={index} link={link} />
        ))}
      {!isTopPage && (
        <div className="flex ml4 mv3 gray">
          {pageIndex > 0 && (
            <Link
              to={`/new/${pageIndex}`}
              className="button pointer no-underline mr2"
            >
              Previous
            </Link>
          )}
          {displayNextLink && (
            <Link
              to={`/new/${pageIndex + 2}`}
              className="button pointer no-underline"
            >
              Next
            </Link>
          )}
        </div>
      )}
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
