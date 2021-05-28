import { useMutation, gql } from '@apollo/client';
import { FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router';
import { Mutation, MutationCreateLinkArgs } from './generated/graphql';
import { routes } from './routes';

const CREATE_LINK_MUTATION = gql`
  mutation CreateLinkMutation($description: String!, $url: String!) {
    createLink(description: $description, url: $url) {
      id
      url
      description
    }
  }
`;

export const CreateLink: FunctionComponent = () => {
  const history = useHistory();

  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');

  const [createLink] = useMutation<
    Pick<Mutation, 'createLink'>,
    MutationCreateLinkArgs
  >(CREATE_LINK_MUTATION, {
    variables: {
      description,
      url,
    },
    onCompleted: () => history.push(routes.linkList),
  });

  return (
    <main>
      <h1>Create link</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createLink();
        }}
      >
        <label className="mb2 db">
          <span className="db">Description</span>
          <input
            value={description}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label className="mb2 db">
          <span className="db">URL</span>
          <input
            value={url}
            name="url"
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <button>Add link</button>
      </form>
    </main>
  );
};
