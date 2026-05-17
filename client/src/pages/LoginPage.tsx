import { Link } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-slate-900">Login</h1>
          <p className="text-sm text-slate-600">Access your leads dashboard</p>
        </div>
        <LoginForm />
        <p className="text-center text-sm text-slate-600">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-medium text-teal-700">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;