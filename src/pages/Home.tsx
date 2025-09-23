import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, TrendingUp, Users, Target, Star, Quote, BookOpen } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import NewsletterSignup from '../components/NewsletterSignup';
import BlogCard from '../components/BlogCard';
import { useState, useEffect } from 'react';
import { supabase, type BlogPost } from '../lib/supabase';

const Home: React.FC = () => {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedPosts();
  }, []);

  const fetchFeaturedPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setFeaturedPosts(data || []);
    } catch (error) {
      console.error('Error fetching featured posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Simplified Crypto",
      description: "Complex blockchain concepts broken down into digestible insights anyone can understand."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Business Growth",
      description: "Proven strategies and frameworks for scaling your startup or side hustle effectively."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community First",
      description: "Join a network of like-minded entrepreneurs and innovators building the future together."
    }
  ];

  const testimonials = [
    {
      quote: "Capryos transformed how I understand crypto investing. The insights are practical and actionable.",
      author: "Sarah Chen",
      role: "Tech Entrepreneur"
    },
    {
      quote: "Finally, someone who explains DeFi without the jargon. Game-changing content for business owners.",
      author: "Marcus Rodriguez",
      role: "Startup Founder"
    }
  ];

  return (
    <div className="relative">
      <SEOHead
        title="Capryos - Crypto & Business Made Simple"
        description="Simplifying crypto, entrepreneurship, and financial knowledge for the next generation of builders. Join thousands learning to build smarter."
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                <span className="block">Crypto & Business</span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                  Made Simple
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Turning complex ideas into practical insights for the next generation of entrepreneurs and investors.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/blog"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <span>Explore Blog</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Hero */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-white space-y-6 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Join 2000+ Smart Entrepreneurs
            </h2>
            <p className="text-xl text-blue-100">
              Get weekly insights on crypto, business strategies, and the latest trends 
              in entrepreneurship delivered straight to your inbox.
            </p>
          </div>
          <div className="flex justify-center">
            <NewsletterSignup variant="hero" />
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <BookOpen className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto" />
              <h2 className="text-3xl sm:text-4xl font-bold">Latest Insights</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Fresh perspectives on crypto, business, and entrepreneurship.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            <div className="text-center">
              <Link
                to="/blog"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                <span>View All Articles</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Why Choose Capryos?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We bridge the gap between complex technology and practical business knowledge.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <Target className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto" />
          <h2 className="text-3xl sm:text-4xl font-bold">Our Mission</h2>
          <blockquote className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed italic">
            "At Capryos, we believe that the future belongs to those who understand both technology and business. 
            Our mission is to simplify crypto, entrepreneurship, and financial knowledge, turning complex ideas 
            into practical insights anyone can use. Whether you're an aspiring founder, a curious investor, 
            or just exploring the digital economy, Capryos is your guide to learning, building, and growing smarter."
          </blockquote>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Star className="h-12 w-12 text-yellow-500 mx-auto" />
            <h2 className="text-3xl sm:text-4xl font-bold">What People Are Saying</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-lg"
              >
                <Quote className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-4" />
                <blockquote className="text-lg text-gray-700 dark:text-gray-300 mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold">Ready to Level Up?</h2>
          <p className="text-xl opacity-90">
            Start your journey with actionable insights on crypto, business, and entrepreneurship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/blog"
              className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl group"
            >
              <span>Start Reading</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              to="/newsletter"
              className="inline-flex items-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              <span>Join Newsletter</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;