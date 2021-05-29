import { gql, useMutation } from '@apollo/client';
import { FunctionComponent, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import type {
  Link as LinkType,
  Mutation,
  MutationVoteArgs,
} from '../generated/graphql';

interface Props {
  index: number;
  link: LinkType;
}

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
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

export const Link: FunctionComponent<Props> = ({
  index,
  link: { id, description, url, votes, postedBy, createdAt },
}) => {
  const { isLoggedIn } = useContext(AuthContext);

  const [vote] = useMutation<Pick<Mutation, 'vote'>, MutationVoteArgs>(
    VOTE_MUTATION,
    {
      variables: {
        linkId: id,
      },
    }
  );

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        {isLoggedIn && (
          <div
            className="ml1 gray f11"
            style={{ cursor: 'pointer' }}
            onClick={() => vote()}
          >
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {description} ({url})
        </div>
        {isLoggedIn && (
          <div className="f6 lh-copy gray">
            {votes.length} votes | by {postedBy ? postedBy.name : 'Unknown'}{' '}
            {timeDifferenceForDate(createdAt)}
          </div>
        )}
      </div>
    </div>
  );
};

// TODO improve types
function timeDifference(current: number, previous: number) {
  const milliSecondsPerMinute = 60 * 1000;
  const milliSecondsPerHour = milliSecondsPerMinute * 60;
  const milliSecondsPerDay = milliSecondsPerHour * 24;
  const milliSecondsPerMonth = milliSecondsPerDay * 30;
  const milliSecondsPerYear = milliSecondsPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < milliSecondsPerMinute / 3) {
    return 'just now';
  }

  if (elapsed < milliSecondsPerMinute) {
    return 'less than 1 min ago';
  } else if (elapsed < milliSecondsPerHour) {
    return Math.round(elapsed / milliSecondsPerMinute) + ' min ago';
  } else if (elapsed < milliSecondsPerDay) {
    return Math.round(elapsed / milliSecondsPerHour) + ' h ago';
  } else if (elapsed < milliSecondsPerMonth) {
    return Math.round(elapsed / milliSecondsPerDay) + ' days ago';
  } else if (elapsed < milliSecondsPerYear) {
    return Math.round(elapsed / milliSecondsPerMonth) + ' mo ago';
  } else {
    return Math.round(elapsed / milliSecondsPerYear) + ' years ago';
  }
}

function timeDifferenceForDate(date: string) {
  const now = new Date().getTime();
  const updated = new Date(date).getTime();
  return timeDifference(now, updated);
}
