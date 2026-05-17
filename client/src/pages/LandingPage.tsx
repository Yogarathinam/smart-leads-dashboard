import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../features/auth/auth.store';
import { useThemeStore } from '../features/theme/theme.store';

type AuthTab = 'login' | 'register';

type LoginFormValues = {
  email: string;
  password: string;
};

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'sales';
};

type AuthResponse = {
  token: string;
  user: AuthUser;
};

const Icons = {
  Logo: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2L2 22h20L12 2z" />
      <path d="M12 12L2 22" />
      <path d="M12 12l10 10" />
    </svg>
  ),
  Sun: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  Moon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  Close: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Mail: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Lock: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  User: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  ArrowRight: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Search: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Users: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  BarChart: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  Activity: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

const authApi = {
  async login(payload: LoginFormValues): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || 'Login failed');
    }

    return data.data;
  },

  async register(payload: RegisterFormValues): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || 'Registration failed');
    }

    return data.data;
  },
};

const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible] as const;
};

const Reveal = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out will-change-transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

type ClonableInputProps = React.InputHTMLAttributes<HTMLInputElement>;

type InputFieldProps = {
  label: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactElement<ClonableInputProps>;
  rightSlot?: React.ReactNode;
  isDark: boolean;
};

const InputField = ({
  label,
  type,
  placeholder,
  icon,
  error,
  children,
  rightSlot,
  isDark,
}: InputFieldProps) => {
  const textMuted = isDark ? 'text-zinc-400' : 'text-zinc-500';
  const textMain = isDark ? 'text-zinc-50' : 'text-zinc-900';
  const borderCol = isDark ? 'border-zinc-800' : 'border-zinc-200';
  const inputBg = isDark ? 'bg-[#09090B]' : 'bg-white';

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className={`text-xs font-medium ${textMuted}`}>{label}</label>
        {rightSlot}
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-400">
          {icon}
        </div>

        {React.cloneElement(children, {
          type,
          placeholder,
          className: `w-full border ${borderCol} rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 ${
            isDark
              ? 'focus:ring-zinc-100 focus:border-zinc-100'
              : 'focus:ring-zinc-900 focus:border-zinc-900'
          } transition-all ${inputBg} ${textMain}`,
        })}
      </div>

      {error ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  );
};

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialTab: AuthTab;
  isDark: boolean;
};

const AuthModal = ({ isOpen, onClose, initialTab, isDark }: AuthModalProps) => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [activeTab, setActiveTab] = useState<AuthTab>(initialTab);
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [authError, setAuthError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLogin,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    reset: resetRegister,
  } = useForm<RegisterFormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setActiveTab(initialTab);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setIsRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialTab]);

  useEffect(() => {
    setAuthError('');
  }, [activeTab]);

  const onLogin = async (values: LoginFormValues) => {
    try {
      setAuthError('');
      setIsSubmitting(true);

      const data = await authApi.login(values);

      setAuth(data.user, data.token);
      resetLogin();
      onClose();
      navigate('/dashboard', { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      setAuthError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onRegister = async (values: RegisterFormValues) => {
    try {
      setAuthError('');
      setIsSubmitting(true);

      const data = await authApi.register(values);

      setAuth(data.user, data.token);
      resetRegister();
      onClose();
      navigate('/dashboard', { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      setAuthError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isRendered) return null;

  const bgModal = isDark ? 'bg-[#09090B]' : 'bg-white';
  const textMain = isDark ? 'text-zinc-50' : 'text-zinc-900';
  const textMuted = isDark ? 'text-zinc-400' : 'text-zinc-500';
  const borderCol = isDark ? 'border-zinc-800' : 'border-zinc-200';

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className={`relative w-full max-w-md ${bgModal} border ${borderCol} rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'translate-y-0 scale-100' : 'translate-y-12 scale-95'}`}>
        <button onClick={onClose} className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-10 ${textMuted} hover:text-zinc-50`}>
          <Icons.Close />
        </button>

        <div className="p-8">
          <div className="mb-8">
            <h2 className={`text-2xl font-medium tracking-tight ${textMain}`}>
              {activeTab === 'login' ? 'Welcome back.' : 'Create your account.'}
            </h2>
            <p className={`text-sm mt-1.5 ${textMuted}`}>
              {activeTab === 'login'
                ? 'Enter your details to access your workspace.'
                : 'Join thousands of high-performance teams.'}
            </p>
          </div>

          <div className={`relative flex p-1 rounded-lg mb-8 border ${borderCol} ${isDark ? 'bg-zinc-900/50' : 'bg-zinc-50'}`}>
            <div
              className={`absolute inset-y-1 w-[calc(50%-4px)] rounded-md shadow-sm transition-transform duration-300 ease-out ${isDark ? 'bg-[#09090B] border border-zinc-700' : 'bg-white border border-zinc-200'}`}
              style={{
                transform: activeTab === 'login' ? 'translateX(0)' : 'translateX(100%)',
                left: '4px',
              }}
            />
            <button
              onClick={() => setActiveTab('login')}
              className={`relative flex-1 py-1.5 text-sm font-medium transition-colors z-10 ${activeTab === 'login' ? textMain : textMuted}`}
              type="button"
            >
              Log In
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`relative flex-1 py-1.5 text-sm font-medium transition-colors z-10 ${activeTab === 'register' ? textMain : textMuted}`}
              type="button"
            >
              Register
            </button>
          </div>

          {authError ? (
            <div className={`mb-4 rounded-lg border px-3 py-2 text-sm ${isDark ? 'border-red-900 bg-red-950/40 text-red-300' : 'border-red-200 bg-red-50 text-red-600'}`}>
              {authError}
            </div>
          ) : null}

          {activeTab === 'login' ? (
            <form className="space-y-4" onSubmit={handleLoginSubmit(onLogin)}>
              <InputField
                label="Email address"
                type="email"
                placeholder="name@company.com"
                icon={<Icons.Mail />}
                error={loginErrors.email?.message}
                isDark={isDark}
              >
                <input
                  {...registerLogin('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: 'Enter a valid email address',
                    },
                  })}
                />
              </InputField>

              <InputField
                label="Password"
                type="password"
                placeholder="••••••••"
                icon={<Icons.Lock />}
                error={loginErrors.password?.message}
                isDark={isDark}
                rightSlot={<button type="button" className={`text-xs ${textMuted} transition-colors hover:text-zinc-50`}>Forgot?</button>}
              >
                <input
                  {...registerLogin('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                />
              </InputField>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2.5 mt-6 rounded-lg font-medium text-sm transition-transform active:scale-[0.98] disabled:opacity-60 ${
                  isDark
                    ? 'bg-zinc-50 text-zinc-900 hover:bg-zinc-200'
                    : 'bg-zinc-900 text-zinc-50 hover:bg-zinc-800'
                }`}
              >
                {isSubmitting ? 'Please wait...' : 'Continue'}
              </button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleRegisterSubmit(onRegister)}>
              <InputField
                label="Full name"
                type="text"
                placeholder="John Doe"
                icon={<Icons.User />}
                error={registerErrors.name?.message}
                isDark={isDark}
              >
                <input
                  {...registerRegister('name', {
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters',
                    },
                  })}
                />
              </InputField>

              <InputField
                label="Email address"
                type="email"
                placeholder="name@company.com"
                icon={<Icons.Mail />}
                error={registerErrors.email?.message}
                isDark={isDark}
              >
                <input
                  {...registerRegister('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: 'Enter a valid email address',
                    },
                  })}
                />
              </InputField>

              <InputField
                label="Password"
                type="password"
                placeholder="••••••••"
                icon={<Icons.Lock />}
                error={registerErrors.password?.message}
                isDark={isDark}
              >
                <input
                  {...registerRegister('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                  })}
                />
              </InputField>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2.5 mt-6 rounded-lg font-medium text-sm transition-transform active:scale-[0.98] disabled:opacity-60 ${
                  isDark
                    ? 'bg-zinc-50 text-zinc-900 hover:bg-zinc-200'
                    : 'bg-zinc-900 text-zinc-50 hover:bg-zinc-800'
                }`}
              >
                {isSubmitting ? 'Creating account...' : 'Start free trial'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const InteractiveShowcase = ({ isDark }: { isDark: boolean }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    {
      id: 'roles',
      title: 'Granular Role Management',
      desc: 'Precision control over team permissions. Ensure the right people see the right pipeline data instantly.',
    },
    {
      id: 'routing',
      title: 'Automated Lead Routing',
      desc: 'Rule-based distribution engines that parse inbound traffic and assign leads to reps with zero latency.',
    },
    {
      id: 'analytics',
      title: 'Pipeline Analytics',
      desc: 'Monitor velocity, track conversion bottlenecks, and forecast revenue with real-time abstract data views.',
    },
  ];

  useEffect(() => {
    if (isHovered) return;

    const timer = window.setInterval(() => {
      setActiveTab((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, [features.length, isHovered]);

  const borderCol = isDark ? 'border-zinc-800' : 'border-zinc-200';
  const cardBg = isDark ? 'bg-zinc-900/50' : 'bg-white';
  const highlight = isDark ? 'bg-zinc-50' : 'bg-zinc-900';

  return (
    <div
      className={`mt-16 grid md:grid-cols-2 gap-8 lg:gap-16 items-center p-8 rounded-3xl border ${borderCol} ${cardBg} backdrop-blur-xl`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="space-y-2">
        {features.map((feat, idx) => {
          const isActive = activeTab === idx;
          return (
            <div
              key={feat.id}
              onClick={() => setActiveTab(idx)}
              className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                isActive
                  ? isDark
                    ? 'border-zinc-700 bg-zinc-800/50'
                    : 'border-zinc-300 bg-zinc-50'
                  : 'border-transparent hover:border-zinc-200 dark:hover:border-zinc-800'
              }`}
            >
              <h3 className={`text-xl font-semibold tracking-tight transition-colors ${isActive ? (isDark ? 'text-zinc-50' : 'text-zinc-900') : 'text-zinc-500'}`}>
                {feat.title}
              </h3>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-24 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {feat.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`relative h-[300px] rounded-2xl border ${borderCol} overflow-hidden flex items-center justify-center ${isDark ? 'bg-[#09090B]' : 'bg-zinc-50'}`}>
        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-4 transition-all duration-700 transform ${activeTab === 0 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}`}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={`w-48 h-12 rounded-xl border ${borderCol} flex items-center justify-between px-4 ${isDark ? 'bg-zinc-900' : 'bg-white'}`}>
              <div className={`w-20 h-2 rounded-full ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`} />
              <div className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-500 ${activeTab === 0 ? highlight : isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
                <div className={`w-4 h-4 rounded-full transition-transform duration-500 ${activeTab === 0 ? 'translate-x-5 bg-white' : 'translate-x-0 bg-zinc-400'}`} />
              </div>
            </div>
          ))}
        </div>

        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 transform ${activeTab === 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}`}>
          <div className="relative w-48 h-48">
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-xl z-10 flex items-center justify-center ${highlight}`}>
              <Icons.Logo className={`w-6 h-6 ${isDark ? 'text-zinc-900' : 'text-white'}`} />
            </div>

            {[0, 120, 240].map((deg, i) => (
              <React.Fragment key={deg}>
                <div className={`absolute top-1/2 left-1/2 w-24 h-0.5 origin-left ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`} style={{ transform: `rotate(${deg}deg)` }}>
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${highlight}`}
                    style={{
                      animation: activeTab === 1 ? `route-payload 2s infinite ${i * 0.6}s` : 'none',
                      opacity: 0,
                    }}
                  />
                </div>

                <div
                  className={`absolute w-8 h-8 rounded-full border-2 ${borderCol} ${isDark ? 'bg-zinc-900' : 'bg-white'}`}
                  style={{
                    top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * 100}px)`,
                    left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * 100}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className={`absolute inset-0 flex items-end justify-center gap-3 p-8 transition-all duration-700 transform ${activeTab === 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}`}>
          {[40, 70, 45, 90, 60].map((h, i) => (
            <div
              key={i}
              className={`w-8 rounded-t-sm transition-all duration-1000 ease-out ${isDark ? 'bg-zinc-700' : 'bg-zinc-300'}`}
              style={{
                height: activeTab === 2 ? `${h}%` : '0%',
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <div className={`w-full rounded-t-sm ${highlight} transition-all duration-1000`} style={{ height: activeTab === 2 ? '100%' : '0%', opacity: 0.3 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MinimalReviews = ({ isDark }: { isDark: boolean }) => {
  const [index, setIndex] = useState(0);

  const reviews = [
    {
      quote: "Vertex removed the friction from our sales process. It's fast, invisible, and strictly effective.",
      author: 'Sarah Jenkins, VP of Sales',
    },
    {
      quote: "The most beautiful enterprise software we've ever deployed. Our SDRs actually enjoy using it.",
      author: 'Michael Chen, Ops Lead',
    },
    {
      quote: 'Granular routing rules without the cluttered interface. It does exactly what it needs to.',
      author: 'David Ross, Founder',
    },
  ];

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % reviews.length), 5000);
    return () => window.clearInterval(timer);
  }, [reviews.length]);

  return (
    <div className="py-24 text-center">
      <p className={`text-sm font-medium tracking-widest uppercase mb-8 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
        Trusted by modern teams
      </p>
      <div className="relative h-32 max-w-2xl mx-auto flex items-center justify-center">
        {reviews.map((rev, i) => (
          <div key={i} className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${index === i ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}`}>
            <h4 className={`text-xl md:text-2xl font-medium leading-relaxed mb-4 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
              "{rev.quote}"
            </h4>
            <span className={`text-sm ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>— {rev.author}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const DashboardMock = ({ isDark }: { isDark: boolean }) => {
  const bgPane = isDark ? 'bg-[#09090B]' : 'bg-white';
  const borderCol = isDark ? 'border-zinc-800' : 'border-zinc-200';
  const textMain = isDark ? 'text-zinc-100' : 'text-zinc-900';
  const textMuted = isDark ? 'text-zinc-500' : 'text-zinc-400';
  const bgHover = isDark ? 'hover:bg-zinc-800/50' : 'hover:bg-zinc-50';

  return (
    <div className={`flex w-full h-[500px] text-sm overflow-hidden rounded-b-2xl md:rounded-b-[2rem] ${bgPane}`}>
      <div className={`hidden md:flex flex-col items-center py-6 w-16 border-r ${borderCol} shrink-0`}>
        <div className="mb-8">
          <Icons.Logo className={`w-6 h-6 ${textMain}`} />
        </div>
        <div className="flex flex-col gap-6 w-full items-center">
          <div className="p-2 rounded-lg bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm">
            <Icons.Activity />
          </div>
          <div className={`p-2 rounded-lg ${textMuted} ${bgHover} cursor-pointer transition-colors`}>
            <Icons.Users />
          </div>
          <div className={`p-2 rounded-lg ${textMuted} ${bgHover} cursor-pointer transition-colors`}>
            <Icons.BarChart />
          </div>
          <div className={`p-2 rounded-lg ${textMuted} ${bgHover} cursor-pointer transition-colors`}>
            <Icons.Mail />
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className={`h-14 border-b ${borderCol} flex items-center justify-between px-6 shrink-0`}>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md border ${borderCol} ${isDark ? 'bg-zinc-900' : 'bg-zinc-50'} w-48`}>
            <Icons.Search className={`w-4 h-4 ${textMuted}`} />
            <span className={`text-xs ${textMuted}`}>Search leads...</span>
          </div>
          <div className="flex items-center gap-3">
            <div className={`text-xs font-medium px-2.5 py-1 rounded-full ${isDark ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-600'}`}>
              Q3 Pipeline
            </div>
            <div className={`w-7 h-7 rounded-full border ${borderCol} overflow-hidden bg-gradient-to-tr from-zinc-300 to-zinc-100 dark:from-zinc-700 dark:to-zinc-800`} />
          </div>
        </div>

        <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-y-auto custom-scrollbar">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 shrink-0">
              {[
                { label: 'Active Leads', val: '2,845', trend: '+12%', up: true },
                { label: 'Conversion Rate', val: '14.2%', trend: '+1.1%', up: true },
                { label: 'Velocity', val: '12 Days', trend: '-2.4%', up: false },
              ].map((stat, i) => (
                <div key={i} className={`p-4 rounded-xl border ${borderCol} ${isDark ? 'bg-zinc-900/50' : 'bg-zinc-50/50'} flex flex-col gap-1 fade-in-up`} style={{ animationDelay: `${i * 100}ms` }}>
                  <span className={`text-xs font-medium ${textMuted}`}>{stat.label}</span>
                  <div className="flex items-end justify-between mt-1">
                    <span className={`text-xl font-semibold tracking-tight ${textMain}`}>{stat.val}</span>
                    <span className={`text-xs font-medium ${stat.up ? (isDark ? 'text-zinc-300' : 'text-zinc-600') : 'text-zinc-500'}`}>
                      {stat.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className={`flex-1 rounded-xl border ${borderCol} ${isDark ? 'bg-zinc-900/30' : 'bg-white'} p-5 flex flex-col min-h-[200px] fade-in-up`} style={{ animationDelay: '300ms' }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-sm font-medium ${textMain}`}>Inbound Volume</h3>
                <div className="flex gap-2">
                  {['1W', '1M', '3M'].map((p, i) => (
                    <span
                      key={p}
                      className={`text-[10px] font-medium px-2 py-0.5 rounded cursor-pointer ${
                        i === 1 ? (isDark ? 'bg-zinc-800 text-zinc-100' : 'bg-zinc-200 text-zinc-900') : textMuted
                      }`}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative flex-1 w-full mt-2">
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-full border-t border-dashed ${isDark ? 'border-zinc-800/80' : 'border-zinc-200'} h-0`} />
                  ))}
                </div>

                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={isDark ? '#e4e4e7' : '#18181b'} stopOpacity="0.2" />
                      <stop offset="100%" stopColor={isDark ? '#e4e4e7' : '#18181b'} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M 0 80 Q 15 70, 25 50 T 50 40 T 75 60 T 100 20" fill="url(#chartGrad)" className="animate-fade-in" />
                  <path
                    d="M 0 80 Q 15 70, 25 50 T 50 40 T 75 60 T 100 20"
                    fill="none"
                    stroke={isDark ? '#f4f4f5' : '#09090b'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="draw-line-anim"
                    strokeDasharray="300"
                    strokeDashoffset="300"
                  />
                  <circle cx="25" cy="50" r="3" fill={isDark ? '#18181b' : '#ffffff'} stroke={isDark ? '#f4f4f5' : '#09090b'} strokeWidth="1.5" className="animate-fade-in delay-500" />
                  <circle cx="50" cy="40" r="3" fill={isDark ? '#18181b' : '#ffffff'} stroke={isDark ? '#f4f4f5' : '#09090b'} strokeWidth="1.5" className="animate-fade-in delay-700" />
                  <circle cx="75" cy="60" r="3" fill={isDark ? '#18181b' : '#ffffff'} stroke={isDark ? '#f4f4f5' : '#09090b'} strokeWidth="1.5" className="animate-fade-in delay-1000" />
                </svg>
              </div>
            </div>
          </div>

          <div className={`rounded-xl border ${borderCol} ${isDark ? 'bg-zinc-900/30' : 'bg-white'} p-5 flex flex-col fade-in-up`} style={{ animationDelay: '400ms' }}>
            <h3 className={`text-sm font-medium mb-4 ${textMain}`}>Recent Routing</h3>
            <div className="flex flex-col gap-3 flex-1 overflow-hidden">
              {[
                { name: 'Acme Corp', rep: 'S. Jenkins', status: 'Assigned', time: '2m ago' },
                { name: 'Global Tech', rep: 'M. Chen', status: 'Reviewing', time: '14m ago' },
                { name: 'Nexus Ind.', rep: 'D. Ross', status: 'Qualified', time: '1h ago' },
                { name: 'Stark Ltd', rep: 'Auto-Rule', status: 'Routed', time: '2h ago' },
                { name: 'Wayne Ent', rep: 'S. Jenkins', status: 'Assigned', time: '3h ago' },
              ].map((item, i) => (
                <div key={i} className={`group flex items-center justify-between p-3 rounded-lg border border-transparent ${bgHover} transition-colors fade-in-up`} style={{ animationDelay: `${500 + i * 100}ms` }}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-semibold border ${borderCol} ${isDark ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-700'}`}>
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <p className={`text-xs font-medium ${textMain}`}>{item.name}</p>
                      <p className={`text-[10px] ${textMuted}`}>{item.rep}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-medium border ${borderCol} ${isDark ? 'bg-zinc-800/50 text-zinc-300' : 'bg-zinc-100 text-zinc-600'}`}>
                      <span className={`w-1 h-1 rounded-full ${item.status === 'Assigned' ? 'bg-zinc-800 dark:bg-zinc-300' : 'bg-zinc-400'}`} />
                      {item.status}
                    </span>
                    <p className={`text-[10px] mt-1 ${textMuted}`}>{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function LandingPage() {
const theme = useThemeStore((state) => state.theme);
const toggleTheme = useThemeStore((state) => state.toggleTheme);
const isDark = theme === 'dark';
  const [authConfig, setAuthConfig] = useState<{ isOpen: boolean; tab: AuthTab }>({
    isOpen: false,
    tab: 'login',
  });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openAuth = (tab: AuthTab) => setAuthConfig({ isOpen: true, tab });

  const bgMain = isDark ? 'bg-[#09090B]' : 'bg-[#FAFAFA]';
  const textMain = isDark ? 'text-zinc-50' : 'text-zinc-900';
  const textMuted = isDark ? 'text-zinc-400' : 'text-zinc-500';
  const borderCol = isDark ? 'border-zinc-800' : 'border-zinc-200';
  const navBg = isDark ? 'bg-[#09090B]/80' : 'bg-[#FAFAFA]/80';
  const btnPrimary = isDark ? 'bg-zinc-50 text-zinc-900 hover:bg-zinc-200' : 'bg-zinc-900 text-zinc-50 hover:bg-zinc-800';
  const btnSecondary = isDark ? 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-zinc-50' : 'bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900';

  return (
    <div className={`min-h-screen ${bgMain} font-sans selection:bg-zinc-300/30 transition-colors duration-500`}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes route-payload {
            0% { left: 0; opacity: 0; transform: scale(0.5); }
            20% { opacity: 1; transform: scale(1); }
            80% { opacity: 1; transform: scale(1); }
            100% { left: 100px; opacity: 0; transform: scale(0.5); }
          }
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes draw-line-anim {
            to { stroke-dashoffset: 0; }
          }
          .fade-in-up {
            animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
          }
          .draw-line-anim {
            animation: draw-line-anim 2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            animation-delay: 0.4s;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: ${isDark ? '#27272a' : '#e4e4e7'};
            border-radius: 4px;
          }
          .minimal-mesh {
            background-image:
              radial-gradient(at 40% 20%, ${isDark ? 'hsla(0,0%,100%,0.03)' : 'hsla(0,0%,0%,0.02)'} 0px, transparent 50%),
              radial-gradient(at 80% 0%, ${isDark ? 'hsla(0,0%,100%,0.02)' : 'hsla(0,0%,0%,0.03)'} 0px, transparent 50%),
              radial-gradient(at 0% 50%, ${isDark ? 'hsla(0,0%,100%,0.02)' : 'hsla(0,0%,0%,0.02)'} 0px, transparent 50%);
          }
        `,
        }}
      />

      <div className="fixed inset-0 minimal-mesh pointer-events-none z-0" />

      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 backdrop-blur-xl ${scrolled ? `border-b ${borderCol} ${navBg}` : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className={`flex items-center gap-2 ${textMain}`}>
            <Icons.Logo />
            <span className="font-semibold tracking-tight text-lg">GigFlow</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors ${textMuted} hover:text-zinc-50`}>
              {isDark ? <Icons.Sun /> : <Icons.Moon />}
            </button>
            <div className="hidden sm:block w-px h-4 bg-zinc-300 dark:bg-zinc-800" />
            <button onClick={() => openAuth('login')} className={`text-sm font-medium transition-colors ${textMuted} hover:text-zinc-50`}>
              Log in
            </button>
            <button onClick={() => openAuth('register')} className={`hidden sm:flex text-sm font-medium px-4 py-1.5 rounded-full transition-all active:scale-95 ${btnPrimary}`}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-24 px-6 max-w-6xl mx-auto">
        <section className="text-center pt-10 md:pt-20 pb-16">
          <Reveal delay={100}>
            <h1 className={`text-5xl md:text-7xl font-semibold tracking-tighter mb-6 ${textMain} leading-[1.1]`}>
              Pipeline intelligence,
              <br className="hidden md:block" /> reduced to the essential.
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 tracking-tight ${textMuted}`}>
              Vertex strips away the clutter of traditional CRMs. Automate routing, enforce granular roles, and analyze data in a pure, distraction-free environment.
            </p>
          </Reveal>

          <Reveal delay={500}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button onClick={() => openAuth('register')} className={`group flex items-center justify-center gap-2 px-6 py-3 rounded-full text-base font-medium transition-all active:scale-95 ${btnPrimary} w-full sm:w-auto`}>
                Start your trial
                <Icons.ArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>
              <button onClick={() => openAuth('login')} className={`px-6 py-3 rounded-full text-base font-medium transition-all active:scale-95 ${btnSecondary} w-full sm:w-auto`}>
                Sign in to workspace
              </button>
            </div>
          </Reveal>
        </section>

        <Reveal delay={700}>
          <div className={`mt-10 rounded-2xl md:rounded-[2rem] border ${borderCol} ${isDark ? 'bg-[#09090B]/60' : 'bg-white/60'} backdrop-blur-3xl shadow-2xl overflow-hidden`}>
            <div className={`flex items-center px-4 h-12 border-b ${borderCol} shrink-0`}>
              <div className="flex gap-2">
                <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-zinc-700' : 'bg-zinc-300'}`} />
                <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-zinc-700' : 'bg-zinc-300'}`} />
                <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-zinc-700' : 'bg-zinc-300'}`} />
              </div>
            </div>

            <DashboardMock isDark={isDark} />
          </div>
        </Reveal>

        <div className="mt-32">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className={`text-3xl font-semibold tracking-tight mb-4 ${textMain}`}>Engineered for focus.</h2>
              <p className={textMuted}>Everything you need to scale revenue, completely redesigned to stay out of your way.</p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <InteractiveShowcase isDark={isDark} />
          </Reveal>
        </div>

        <Reveal>
          <MinimalReviews isDark={isDark} />
        </Reveal>

        <Reveal>
          <div className={`mt-10 rounded-3xl p-12 md:p-20 text-center border ${borderCol} ${isDark ? 'bg-zinc-900/30' : 'bg-zinc-50/50'}`}>
            <h2 className={`text-3xl md:text-4xl font-semibold tracking-tight mb-6 ${textMain}`}>Ready for clarity?</h2>
            <button onClick={() => openAuth('register')} className={`px-8 py-4 rounded-full text-lg font-medium transition-transform active:scale-95 ${btnPrimary}`}>
              Deploy Vertex today
            </button>
          </div>
        </Reveal>
      </main>

      <footer className={`relative z-10 border-t ${borderCol} py-8 text-center`}>
        <p className={`text-xs tracking-widest uppercase ${textMuted}`}>
          © {new Date().getFullYear()} Vertex Systems. All rights reserved.
        </p>
      </footer>

      <AuthModal
        isOpen={authConfig.isOpen}
        initialTab={authConfig.tab}
        isDark={isDark}
        onClose={() => setAuthConfig((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}