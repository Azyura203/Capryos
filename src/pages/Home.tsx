import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, TrendingUp, Users, Target, Star, Quote, BookOpen, Sparkles, Award, Shield, Rocket, Brain, LineChart, Globe2 } from 'lucide-react';
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
      description: "Complex blockchain concepts broken down into digestible insights anyone can understand.",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Business Growth",
      description: "Proven strategies and frameworks for scaling your startup or side hustle effectively.",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community First",
      description: "Join a network of like-minded entrepreneurs and innovators building the future together.",
      color: "from-blue-400 to-cyan-500"
    }
  ];

  const stats = [
    { label: "Active Readers", value: "10K+", icon: <Users className="h-6 w-6" /> },
    { label: "Articles Published", value: "200+", icon: <BookOpen className="h-6 w-6" /> },
    { label: "Topics Covered", value: "50+", icon: <Brain className="h-6 w-6" /> },
    { label: "Community Members", value: "5K+", icon: <Globe2 className="h-6 w-6" /> }
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
    },
    {
      quote: "The clarity and depth of content here is unmatched. It's my go-to resource for staying ahead in crypto.",
      author: "Alex Kim",
      role: "Crypto Analyst"
    }
  ];

  return (
    <div className="relative">
      <SEOHead
        title="Capryos - Crypto & Business Made Simple"
        description="Simplifying crypto, entrepreneurship, and financial knowledge for the next generation of builders. Join thousands learning to build smarter."
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium">Welcome to the Future of Learning</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold leading-tight text-white">
                <span className="block">Crypto & Business</span>
                <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  Made Simple
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Transforming complex crypto and business concepts into clear, actionable knowledge.
                Join thousands of innovators learning to build smarter.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                to="/blog"
                className="group bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-10 py-5 rounded-xl font-bold text-lg hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Explore Blog</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/about"
                className="px-10 py-5 rounded-xl font-bold text-lg bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <div className="text-blue-400 mb-3 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats & Trust Indicators */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
              <Award className="h-4 w-4" />
              <span className="text-sm font-semibold">Trusted by Thousands</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Leaders Choose Capryos
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join a growing community of forward-thinking entrepreneurs and investors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white dark:bg-gray-800 shadow-xl border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-2xl group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Expert Verified</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                All content reviewed by industry professionals ensuring accuracy and relevance.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-gray-800 shadow-xl border-2 border-transparent hover:border-green-500 dark:hover:border-green-400 transition-all duration-300 hover:shadow-2xl group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Rocket className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Action-Oriented</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Practical insights you can implement immediately to grow your business.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-gray-800 shadow-xl border-2 border-transparent hover:border-orange-500 dark:hover:border-orange-400 transition-all duration-300 hover:shadow-2xl group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <LineChart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Always Updated</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Fresh content weekly covering the latest trends and breakthrough strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white mb-4">
                <BookOpen className="h-4 w-4" />
                <span className="text-sm font-semibold">Latest Content</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Fresh Insights & Perspectives
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Explore our latest articles on crypto, business strategies, and cutting-edge trends
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
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
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
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 mb-4">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">Our Approach</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Learn Smarter, Build Faster
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Bridging the gap between complex technology and practical business knowledge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative group p-10 rounded-3xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-100 dark:border-gray-700 hover:border-transparent hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                <div className="relative z-10">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="text-white space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-4">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span className="text-sm font-semibold">Join Our Community</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Get Weekly Insights Delivered
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Join 2,000+ entrepreneurs and investors receiving actionable insights on crypto, business strategies, and market trends every week.
            </p>

            <div className="flex justify-center pt-6">
              <div className="w-full max-w-lg">
                <NewsletterSignup variant="hero" />
              </div>
            </div>

            <p className="text-sm text-blue-200 pt-4">
              No spam. Unsubscribe anytime. Your privacy is our priority.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 mb-4">
              <Star className="h-4 w-4" />
              <span className="text-sm font-semibold">Success Stories</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See how Capryos has helped entrepreneurs and investors succeed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative p-8 rounded-3xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                  <Quote className="h-6 w-6 text-white" />
                </div>

                <div className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <blockquote className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">{testimonial.author}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Rocket className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium">Start Your Journey</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
              Ready to Transform Your Future?
            </h2>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join thousands of entrepreneurs and investors who are learning to build smarter with Capryos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Link
                to="/blog"
                className="group inline-flex items-center gap-2 bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:scale-105"
              >
                <span>Start Reading</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-10 py-5 rounded-xl font-bold text-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
              >
                <Target className="h-5 w-5" />
                <span>Learn More</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-4xl mx-auto">
              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-2xl font-bold mb-1">100%</div>
                <div className="text-sm text-gray-300">Free Content</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-2xl font-bold mb-1">Weekly</div>
                <div className="text-sm text-gray-300">Updates</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-2xl font-bold mb-1">Expert</div>
                <div className="text-sm text-gray-300">Insights</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-2xl font-bold mb-1">Global</div>
                <div className="text-sm text-gray-300">Community</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;