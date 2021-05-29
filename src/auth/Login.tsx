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

// TODO error handling
export const Login: FunctionComponent = () => {
  const history = useHistory();
  const { setToken } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login] = useMutation<Pick<Mutation, 'login'>, MutationLoginArgs>(
    LOGIN_MUTATION,
    {
      variables: {
        email,
        password,
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
    <main>
      <h1 className="f4 mv3">Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
        <div className="flex flex-column">
          <label>
            <span className="db">Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </label>

          <label>
            <span className="db">Password</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
          </label>
        </div>
        <div className="flex mt3">
          <button className="pointer mr2 button">login</button>
        </div>
      </form>
    </main>
  );
};
