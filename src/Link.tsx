import { gql, useMutation } from '@apollo/client';
import { FunctionComponent, useContext } from 'react';
import { AuthContext } from './auth/AuthContext';
import type {
  Link as LinkType,
  Mutation,
  MutationVoteArgs,
} from './generated/graphql';

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
  link: { id, description, url, votes, postedBy },
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
            {/* {timeDifferenceForDate(createdAt)} */}
          </div>
        )}
      </div>
    </div>
  );
};
