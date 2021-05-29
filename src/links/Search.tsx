import { gql, useLazyQuery } from '@apollo/client';
import { FunctionComponent, useState } from 'react';
import { Query, QueryFeedArgs } from '../generated/graphql';
import { Link } from './Link';

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      links {
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
  }
`;

export const Search: FunctionComponent = () => {
  const [query, setQuery] = useState('');
  const [search, { data }] =
    useLazyQuery<Pick<Query, 'feed'>, QueryFeedArgs>(FEED_SEARCH_QUERY);

  return (
    <main>
      <h1 className="f4">Search</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          search({
            variables: {
              filter: query,
            },
          });
        }}
      >
        <label>
          {/* TODO better accessibility */}
          <span hidden>Search</span>
          <input
            type="search"
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <button>Search</button>
      </form>
      {data &&
        data.feed.links.map((link, index) => (
          <Link key={link.id} index={index} link={link} />
        ))}
    </main>
  );
};
