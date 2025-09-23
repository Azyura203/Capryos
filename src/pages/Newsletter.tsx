import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call - replace with actual Mailchimp/Kit integration
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsLoading(false);
    setEmail('');
  };

  const benefits = [
    "Weekly crypto insights and market analysis",
    "Exclusive business growth strategies",
    "Early access to new content and resources",
    "Community updates and networking opportunities",
    "No spam, unsubscribe anytime"
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Welcome to Capryos!</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Thanks for joining our newsletter. Check your inbox for a confirmation email.
            </p>
          </div>
          <button
            onClick={() => setIsSubmitted(false)}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Subscribe another email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 mb-20">
        <Mail className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto" />
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold">Join Our Newsletter</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Get the latest insights on crypto, business strategies, and entrepreneurship 
            delivered straight to your inbox.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Newsletter Form */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      placeholder="Enter your email address"
                    />
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <span>Subscribe Now</span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
              
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-4">
                By subscribing, you agree to receive marketing emails from Capryos. 
                You can unsubscribe at any time.
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">What You'll Get</h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-xl">
              <h3 className="font-semibold text-green-800 dark:text-green-400 mb-2">
                🎯 Free Bonus for New Subscribers
              </h3>
              <p className="text-green-700 dark:text-green-300 text-sm">
                Get our "Crypto Fundamentals Cheat Sheet" - a comprehensive guide 
                covering the essential concepts every beginner needs to know.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <section className="mt-20 bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Trusted by entrepreneurs and crypto enthusiasts worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 text-2xl font-bold text-gray-400 dark:text-gray-600">
            <span>2000+</span>
            <span>Subscribers</span>
            <span>•</span>
            <span>98%</span>
            <span>Open Rate</span>
            <span>•</span>
            <span>Weekly</span>
            <span>Insights</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Newsletter;