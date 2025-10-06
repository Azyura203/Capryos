import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, signIn } = useAuth();

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Welcome back!');
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black text-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left - Brand / Promo */}
        <div className="hidden lg:flex flex-col items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-600 flex items-center justify-center shadow-2xl ring-1 ring-white/10">
            <img src="/public/CAPRYOS-LOGO.jpg" alt="Capryos" className="w-12 h-12 rounded-full object-cover" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Capryos Admin</h1>
            <p className="mt-2 text-sm text-gray-300/80">Curated insights • Elegant control • Real-time updates</p>
          </div>

          <div className="mt-4 p-4 rounded-2xl bg-white/4 backdrop-blur-md border border-white/6 shadow-xl">
            <p className="text-sm text-gray-300/80">Manage posts, subscribers and suggestions with a premium interface. Fast. Secure. Beautiful.</p>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center text-sm font-semibold">P</div>
              <div>
                <p className="text-xs text-gray-300/80">Premium layout</p>
                <p className="text-sm font-medium">Frosted UI • Gold accents</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <div className="w-full">
          <div className="mx-auto max-w-md">
            <div className="text-center mb-6">
              <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h2 className="mt-6 text-2xl sm:text-3xl font-semibold">Admin Sign In</h2>
              <p className="mt-2 text-sm text-gray-300/80">Sign in to access the Capryos admin panel</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-2xl p-6 bg-white/4 backdrop-blur-md border border-white/6 shadow-2xl">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-300" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 w-full px-3 py-3 border border-white/8 rounded-xl bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        placeholder="Email address"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-300" />
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 w-full px-3 py-3 border border-white/8 rounded-xl bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        placeholder="Password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="inline-flex items-center gap-2 text-sm">
                      <input type="checkbox" className="h-4 w-4 rounded border-white/10 bg-transparent" />
                      <span className="text-xs text-gray-300/80">Remember me</span>
                    </label>
                    <a href="/forgot" className="text-sm text-yellow-300/90 hover:underline">Forgot password?</a>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-black bg-gradient-to-r from-yellow-400 to-amber-600 shadow-lg hover:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                      ) : (
                        'Sign In'
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-300/80">
                  Don't have admin access?{' '}
                  <a href="/contact" className="font-medium text-yellow-300/90 hover:underline">Contact us</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;