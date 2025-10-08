import React from 'react';
import {
  Lightbulb,
  Globe,
  Target,
  Users,
  Sparkles,
  Heart,
  Mail,
  Zap,
  BookOpen,
  TrendingUp,
  Shield,
  Award,
  Rocket
} from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium">Simplifying Complexity</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
              About <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Capryos</span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Transforming complex crypto and business concepts into clear, actionable knowledge for builders, innovators, and curious minds.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a
                href="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
              >
                <BookOpen className="h-5 w-5" />
                Explore Articles
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300"
              >
                <Mail className="h-5 w-5" />
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
              <Target className="h-5 w-5" />
              <span>Our Mission</span>
            </div>

            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Making Innovation Accessible to Everyone
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              In a world drowning in technical jargon and complexity, Capryos stands as a beacon of clarity. We believe that groundbreaking ideas shouldn't be trapped behind walls of complicated terminology.
            </p>

            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Our platform bridges the gap between innovation and understanding, transforming sophisticated crypto and business concepts into practical, implementable knowledge.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-xl transform hover:scale-105 transition-transform duration-300">
              <TrendingUp className="h-10 w-10 mb-4" />
              <div className="text-3xl font-bold mb-2">10K+</div>
              <div className="text-sm opacity-90">Monthly Readers</div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-xl transform hover:scale-105 transition-transform duration-300">
              <BookOpen className="h-10 w-10 mb-4" />
              <div className="text-3xl font-bold mb-2">200+</div>
              <div className="text-sm opacity-90">Articles Published</div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-xl transform hover:scale-105 transition-transform duration-300">
              <Users className="h-10 w-10 mb-4" />
              <div className="text-3xl font-bold mb-2">5K+</div>
              <div className="text-sm opacity-90">Community Members</div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 text-white shadow-xl transform hover:scale-105 transition-transform duration-300">
              <Zap className="h-10 w-10 mb-4" />
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-sm opacity-90">Topics Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold mb-4">
              <Heart className="h-5 w-5" />
              <span>Our Core Values</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              What Drives Us Forward
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-2xl">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Lightbulb className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Clarity First</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We transform complex concepts into clear, digestible insights without sacrificing depth or accuracy.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-2 border-gray-200 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-400 transition-all duration-300 hover:shadow-2xl">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Universal Access</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Knowledge should be free and accessible to everyone, regardless of background or experience level.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-2 border-gray-200 dark:border-gray-600 hover:border-orange-500 dark:hover:border-orange-400 transition-all duration-300 hover:shadow-2xl">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Action-Oriented</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Every piece of content is designed to provide practical, implementable takeaways for real-world application.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold mb-4">
            <Rocket className="h-5 w-5" />
            <span>What We Offer</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Comprehensive Resources for Growth
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">In-Depth Articles</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Comprehensive guides and tutorials covering everything from blockchain fundamentals to advanced business strategies.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Practical Tools</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Ready-to-use frameworks, checklists, and templates to accelerate your projects and streamline workflows.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Market Insights</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Stay ahead with timely analysis of crypto trends, market movements, and emerging opportunities.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Community Support</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Join a vibrant community of learners, builders, and innovators sharing knowledge and experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-yellow-400 font-semibold mb-6">
                <Shield className="h-5 w-5" />
                <span>Our Commitment</span>
              </div>

              <h2 className="text-4xl font-bold mb-6">
                Quality, Accuracy, Excellence
              </h2>

              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Every article, guide, and resource undergoes rigorous review to ensure accuracy, relevance, and practical value. We're committed to maintaining the highest standards of quality in everything we publish.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Expert-Verified Content</h4>
                    <p className="text-gray-300 text-sm">All technical content is reviewed by industry professionals</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Regular Updates</h4>
                    <p className="text-gray-300 text-sm">Content is continuously updated to reflect the latest developments</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Community-Driven</h4>
                    <p className="text-gray-300 text-sm">Your feedback shapes our content and direction</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-sm text-gray-300">Free Content</div>
              </div>

              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-sm text-gray-300">Access</div>
              </div>

              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-bold mb-2">Weekly</div>
                <div className="text-sm text-gray-300">New Content</div>
              </div>

              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-bold mb-2">Global</div>
                <div className="text-sm text-gray-300">Community</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-12 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 text-white shadow-2xl text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of builders and innovators who trust Capryos for their crypto and business education.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/blog"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-blue-600 font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <BookOpen className="h-5 w-5" />
              Browse Articles
            </a>
            <a
              href="/newsletter"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold hover:bg-white/20 transition-all duration-300"
            >
              <Mail className="h-5 w-5" />
              Subscribe to Newsletter
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;