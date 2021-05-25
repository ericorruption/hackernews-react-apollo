import { useMutation, gql } from '@apollo/client';
import { FunctionComponent, useState } from 'react';
import { Mutation, MutationCreateLinkArgs } from './generated/graphql';

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
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createLink();
      }}
    >
      <label className="mb2">
        Description
        <input
          value={description}
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <label className="mb2">
        URL
        <input
          value={url}
          name="url"
          onChange={(e) => setUrl(e.target.value)}
        />
      </label>
      <button>Add link</button>
    </form>
  );
};
