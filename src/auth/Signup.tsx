import { gql, useMutation } from '@apollo/client';
import { FunctionComponent, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Mutation, MutationSignupArgs } from '../generated/graphql';
import { routes } from '../routes';
import { AuthContext } from './AuthContext';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

// TODO error handling
export const Signup: FunctionComponent = () => {
  const history = useHistory();
  const { setToken } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signup] = useMutation<Pick<Mutation, 'signup'>, MutationSignupArgs>(
    SIGNUP_MUTATION,
    {
      variables: {
        name,
        email,
        password,
      },
      onCompleted: ({ signup }) => {
        if (!signup || !signup.token) {
          return;
        }

        setToken(signup.token);
        history.push(routes.linkList);
      },
    }
  );

  return (
    <main>
      <h1 className="f4 mv3">Sign Up</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signup();
        }}
      >
        <div className="flex flex-column">
          <label>
            <span className="db">Your name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
            />
          </label>
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
          <button className="pointer mr2 button">create account</button>
          <Link to={routes.login} className="button no-underline">
            already have an account?
          </Link>
        </div>
      </form>
    </main>
  );
};
