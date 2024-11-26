import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { Link } from 'react-router-dom';

import FormInput from '../components/FormInput';
import Button from '../components/Button';
import Notification from '../components/Notification';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="flex w-full flex-col gap-12">
      <div className="mx-auto mt-12 text-text-primary dark:text-text-primary-dark">
        <h1 className="mb-6 text-center text-5xl font-bold text-text-header dark:text-text-header-dark">
          Login
        </h1>
        <p className="text-center">Access your FrEkK Fit Party account now</p>
      </div>
      <form
        className="mx-auto flex w-full flex-col gap-6 sm:max-w-sm"
        onSubmit={handleSubmit}
      >
        <FormInput
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button disabled={isLoading} type="submit">
          Log In
        </Button>
        {error && (
          <div className="mt-6">
            <Notification type="error">{error}</Notification>
          </div>
        )}
      </form>
      <p className="mx-auto text-center text-text-primary dark:text-text-primary-dark">
        Don&apos;t have an account?{' '}
        <span className="underline hover:no-underline">
          <Link to="/signup">Create one today!</Link>
        </span>
      </p>
    </div>
  );
};

export default Login;
