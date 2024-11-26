import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import useAuthStore from '../store/authStore';
import { poster } from '../utils/http';
import { saveLocal } from '../utils/localStorage';

import FormInput from '../components/FormInput';
import Button from '../components/Button';
import Notification from '../components/Notification';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginUser = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body) =>
      poster({
        url: '/user/login',
        body,
      }),
    onSuccess: (data) => {
      loginUser(data);
      saveLocal('user', data);
      navigate('/');
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await mutate({ email, password });
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
        <Button disabled={isPending} type="submit">
          Log In
        </Button>
        {isError && (
          <div className="mt-6">
            <Notification type="error">{error.message}</Notification>
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
