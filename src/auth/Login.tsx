import { gql, useMutation } from '@apollo/client';
import { FunctionComponent, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { Mutation, MutationLoginArgs } from '../generated/graphql';
import { routes } from '../routes';
import { AuthContext } from './AuthContext';

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

// TODO improve acessibility
export const Login: FunctionComponent = () => {
  const history = useHistory();
  const { setToken } = useContext(AuthContext);

  const [formState, setFormState] = useState({
    email: '',
    password: '',
    name: '',
  });

  const [login] = useMutation<Pick<Mutation, 'login'>, MutationLoginArgs>(
    LOGIN_MUTATION,
    {
      variables: {
        email: formState.email,
        password: formState.password,
      },
      onCompleted: ({ login }) => {
        if (!login || !login.token) {
          return;
        }

        setToken(login.token);
        history.push(routes.linkList);
      },
    }
  );

  return (
    <div>
      <h4 className="mv3">Login</h4>
      <div className="flex flex-column">
        <input
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value,
            })
          }
          type="text"
          placeholder="Your email address"
        />
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value,
            })
          }
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <button className="pointer mr2 button" onClick={() => login()}>
          login
        </button>
      </div>
    </div>
  );
};
