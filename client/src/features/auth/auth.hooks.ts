import { useMutation } from '@tanstack/react-query';
import { loginRequest, registerRequest } from '../../api/auth.api';
import { useAuthStore } from './auth.store';

export const useRegister = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: registerRequest,
    onSuccess: ({ user, token }) => {
      setAuth(user, token);
    },
  });
};

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: ({ user, token }) => {
      setAuth(user, token);
    },
  });
};