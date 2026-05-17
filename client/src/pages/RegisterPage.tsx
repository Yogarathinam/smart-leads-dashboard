import { Link } from 'react-router-dom';
import { RegisterForm } from '../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-slate-900">Register</h1>
          <p className="text-sm text-slate-600">Create your sales account</p>
        </div>
        <RegisterForm />
        <p className="text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-teal-700">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;