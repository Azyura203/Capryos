import React, { useState } from 'react';
import { Mail, CheckCircle, Loader } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface NewsletterSignupProps {
  variant?: 'default' | 'compact' | 'hero';
  className?: string;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ 
  variant = 'default',
  className = ''
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('subscribers')
        .insert([
          {
            email: email.toLowerCase().trim(),
            name: name.trim() || null,
            status: 'active'
          }
        ]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast.error('This email is already subscribed!');
        } else {
          throw error;
        }
      } else {
        setIsSuccess(true);
        toast.success('Successfully subscribed to our newsletter!');
        setEmail('');
        setName('');
        
        // Reset success state after 3 seconds
        setTimeout(() => setIsSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === 'compact') {
    return (
      <div className={`bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white ${className}`}>
        <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
        <p className="text-blue-100 mb-4 text-sm">
          Get the latest insights delivered to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-3 py-2 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-white/50 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-blue-600 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : isSuccess ? (
              <>
                <CheckCircle className="h-4 w-4" />
                <span>Subscribed!</span>
              </>
            ) : (
              <>
                <Mail className="h-4 w-4" />
                <span>Subscribe</span>
              </>
            )}
          </button>
        </form>
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full ${className}`}>
        <div className="text-center mb-6">
          <Mail className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Join Our Newsletter</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Get weekly insights on crypto, business, and entrepreneurship.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <Loader className="h-5 w-5 animate-spin" />
            ) : isSuccess ? (
              <>
                <CheckCircle className="h-5 w-5" />
                <span>Subscribed!</span>
              </>
            ) : (
              <>
                <Mail className="h-5 w-5" />
                <span>Subscribe Now</span>
              </>
            )}
          </button>
        </form>
        
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
          No spam, unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 ${className}`}>
      <div className="text-center mb-6">
        <Mail className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Stay in the Loop</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Get the latest articles and insights delivered straight to your inbox.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <Loader className="h-5 w-5 animate-spin" />
          ) : isSuccess ? (
            <>
              <CheckCircle className="h-5 w-5" />
              <span>Subscribed!</span>
            </>
          ) : (
            <>
              <Mail className="h-5 w-5" />
              <span>Subscribe Now</span>
            </>
          )}
        </button>
      </form>
      
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
        Join 2000+ entrepreneurs. No spam, unsubscribe anytime.
      </p>
    </div>
  );
};

export default NewsletterSignup;