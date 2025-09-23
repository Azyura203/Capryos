import React from 'react';
import { User, Lightbulb, Globe, Target } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="py-20">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 mb-20">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold">About Capryos</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            The story behind our mission to simplify the complex world of crypto and business.
          </p>
        </div>
      </section>

      {/* Kane's Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h2 className="text-3xl font-bold">Meet Kane</h2>
            </div>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                Kane started Capryos from a simple observation: the most powerful financial and technological 
                innovations of our time were being explained in ways that only experts could understand.
              </p>
              <p>
                After years of navigating the crypto space and building successful businesses, Kane realized 
                that the barrier to entry wasn't intelligence or capability—it was clarity. Too many brilliant 
                ideas were locked behind jargon and complexity.
              </p>
              <p>
                Today, Kane leads Capryos with a clear vision: make the future accessible to everyone. Through 
                practical insights, real-world examples, and a community-first approach, Capryos bridges the 
                gap between innovation and implementation.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center">
              <User className="h-32 w-32 text-blue-600 dark:text-blue-400 opacity-60" />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">Founder & CEO</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 py-20">
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

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Our Values</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do at Capryos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <Lightbulb className="h-12 w-12 text-yellow-500 mx-auto" />
              <h3 className="text-xl font-semibold">Simplicity</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We believe complex ideas should be explained simply, without losing their power or precision.
              </p>
            </div>
            <div className="text-center space-y-4">
              <Globe className="h-12 w-12 text-green-500 mx-auto" />
              <h3 className="text-xl font-semibold">Accessibility</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Knowledge should be available to everyone, regardless of background or experience level.
              </p>
            </div>
            <div className="text-center space-y-4">
              <Target className="h-12 w-12 text-blue-500 mx-auto" />
              <h3 className="text-xl font-semibold">Practicality</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Every insight we share is actionable and designed to create real-world impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="bg-white dark:bg-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold">Looking Ahead</h2>
          <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
            <p>
              We're building more than just a content platform. Capryos is evolving into a comprehensive 
              ecosystem for crypto and business education, featuring interactive courses, community-driven 
              projects, and tools that help you implement what you learn.
            </p>
            <p>
              Join us as we continue to democratize access to the knowledge that will shape the next decade 
              of technology and business innovation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;