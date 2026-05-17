import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useRegister } from '../../features/auth/auth.hooks';
import type { ApiErrorResponse } from '../../types/api.types';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useRegister();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    try {
      await mutateAsync(form);
      navigate('/dashboard');
    } catch (error: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        setErrorMessage(error.response?.data?.message ?? 'Registration failed');
      } else {
        setErrorMessage('Something went wrong');
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
      <Input
        label="Name"
        value={form.name}
        onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
      />
      <Input
        label="Email"
        type="email"
        value={form.email}
        onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
      />
      <Input
        label="Password"
        type="password"
        value={form.password}
        onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
      />
      {errorMessage ? <p className="text-sm text-rose-600">{errorMessage}</p> : null}
      <Button type="submit" fullWidth disabled={isPending}>
        {isPending ? 'Registering...' : 'Register'}
      </Button>
    </form>
  );
};