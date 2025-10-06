import React from 'react';
import {
  User,
  Lightbulb,
  Globe,
  Target,
  Users,
  Sparkles,
  Heart,
  Mail
} from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-xl">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <span className="text-sm font-medium tracking-wide text-indigo-600 dark:text-indigo-400">Who we are</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">About Capryos</h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              We simplify the complex world of crypto and business — turning technical ideas into practical, actionable insight for builders and curious minds.
            </p>

            <div className="flex flex-wrap gap-3 mt-4">
              <a
                href="/blog"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
              >
                Explore Articles
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/6 backdrop-blur-sm border border-white/6 text-sm text-gray-900 dark:text-white hover:brightness-95 transition"
              >
                Contact Kane
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-white/8">
              <img
                src="/capryos-hero.jpg"
                alt="Capryos"
                className="w-full h-72 object-cover"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold">Our Approach</h3>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  Clear explanations, practical examples, and real tools to help you build and invest with confidence.
                </p>
                <div className="mt-4 flex gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/8 text-sm font-medium">
                    <Users className="h-4 w-4" /> Community-first
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/8 text-sm font-medium">
                    <Heart className="h-4 w-4" /> Practical
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 -right-9 w-32 h-32 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-500 flex items-center justify-center shadow-2xl ring-1 ring-white/10">
              <User className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Founder & Story */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl p-8 bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-start gap-6">
                <div className="w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center text-white text-3xl font-bold">
                  K
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Meet Kane</h2>
                  <p className="mt-2 text-gray-700 dark:text-gray-300 leading-relaxed">
                    Kane founded Capryos to make technology and business accessible. After years building and navigating crypto and startups, Kane focuses on clarity — turning complex subjects into usable knowledge.
                  </p>
                  <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                    Founder • Writer • Builder
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-white/60 border border-white/8">
                  <div className="text-sm text-gray-500">Experience</div>
                  <div className="mt-2 text-xl font-semibold">10+ yrs</div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-white/60 border border-white/8">
                  <div className="text-sm text-gray-500">Projects</div>
                  <div className="mt-2 text-xl font-semibold">50+</div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-white/60 border border-white/8">
                  <div className="text-sm text-gray-500">Community</div>
                  <div className="mt-2 text-xl font-semibold">Active</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-6 bg-white/6 backdrop-blur-md border border-white/6 shadow-lg">
              <h3 className="text-lg font-semibold">Why we started</h3>
              <p className="mt-3 text-gray-700 dark:text-gray-300">
                Too many valuable ideas were lost in jargon. Capryos is about translating innovation into practical steps — for founders, builders, and curious learners.
              </p>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700">
              <h4 className="text-sm text-gray-500 uppercase tracking-wide">Get in touch</h4>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">Have a project or question? Say hello.</p>
              <a href="/contact" className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-amber-600 text-black font-medium shadow-lg">
                <Mail className="h-4 w-4" /> Contact
              </a>
            </div>

            <div className="rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700">
              <h4 className="text-sm text-gray-500 uppercase tracking-wide">Quick facts</h4>
              <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-3"><Lightbulb className="h-4 w-4 text-yellow-500" />Simple explanations</li>
                <li className="flex items-center gap-3"><Globe className="h-4 w-4 text-green-500" />Accessible globally</li>
                <li className="flex items-center gap-3"><Target className="h-4 w-4 text-blue-500" />Practical outcomes</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-900/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700">
              <Lightbulb className="h-8 w-8 text-yellow-500 mx-auto" />
              <h3 className="mt-4 text-lg font-semibold">Simplicity</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">We make complex topics easy to act on without losing nuance.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700">
              <Globe className="h-8 w-8 text-green-500 mx-auto" />
              <h3 className="mt-4 text-lg font-semibold">Accessibility</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">Learning should be for everyone — no gatekeeping.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700">
              <Target className="h-8 w-8 text-blue-500 mx-auto" />
              <h3 className="mt-4 text-lg font-semibold">Practicality</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">Actionable insights that lead to real-world results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-2xl p-10 bg-gradient-to-br from-indigo-700 to-blue-600 text-white shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-2xl font-semibold">Join our newsletter</h3>
              <p className="mt-2 text-sm text-indigo-100/90">Practical updates on crypto, business, and curated resources delivered weekly.</p>
            </div>

            <form className="flex gap-3 mt-4 md:mt-0" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="you@example.com"
                className="px-4 py-3 rounded-lg outline-none text-gray-900"
              />
              <button className="px-5 py-3 rounded-lg bg-yellow-400 text-black font-semibold hover:brightness-95 transition">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;