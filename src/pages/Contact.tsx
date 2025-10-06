import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle, Twitter, Linkedin, Github } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // basic client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('Please fill in name, email and message.');
      return;
    }

    // Check if running on Netlify
    if (window.location.hostname.includes('netlify') || window.location.hostname === 'localhost') {
      // Let Netlify handle the form submission
      const form = e.target as HTMLFormElement;
      const formDataObj = new FormData(form);

      setIsLoading(true);

      try {
        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formDataObj as any).toString()
        });

        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } catch (error) {
        console.error('Form submission error:', error);
        alert('There was an error submitting the form. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Fallback for development
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 900));
      setIsSubmitted(true);
      setIsLoading(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  const socialLinks = [
    { icon: <Twitter className="h-5 w-5" />, label: 'Twitter', href: '#' },
    { icon: <Linkedin className="h-5 w-5" />, label: 'LinkedIn', href: '#' },
    { icon: <Github className="h-5 w-5" />, label: 'GitHub', href: '#' }
  ];

  return (
    <div className="py-20">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 mb-12">
        <MessageSquare className="h-14 w-14 text-blue-600 dark:text-blue-400 mx-auto" />
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">Get in Touch</h1>
          <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Questions, collaborations or press — drop us a message and we'll respond within 24 hours.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Form Panel */}
          <div className="lg:col-span-2">
            {isSubmitted ? (
              <div className="rounded-2xl p-8 bg-gradient-to-br from-green-50 to-white/10 dark:from-green-900/10 border border-green-200 dark:border-green-800 shadow-lg text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-green-800 dark:text-green-300">Message Sent</h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300">Thanks for reaching out — we'll get back to you shortly.</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-white/6 backdrop-blur-sm border border-white/6 text-sm hover:brightness-95 transition"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700"
              >
                <input type="hidden" name="form-name" value="contact" />
                <div style={{ display: 'none' }}>
                  <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">Your name</label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">Email</label>
                    <div className="relative">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                        placeholder="you@example.com"
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="media">Media & Press</option>
                    <option value="support">Support</option>
                    <option value="business">Business Opportunity</option>
                  </select>
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition resize-none"
                    placeholder="Tell us about your project or question..."
                  />
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <p><strong>Response time:</strong> typically within 24 hours</p>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Right column - Info & socials */}
          <aside className="space-y-6">
            <div className="rounded-2xl p-6 bg-gradient-to-br from-white to-white/5 dark:from-gray-800 dark:to-gray-700 border border-gray-100 dark:border-gray-700 shadow-lg">
              <h3 className="text-lg font-semibold mb-3">Contact Info</h3>
              <div className="flex items-start gap-3">
                <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1" />
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:hello@capryos.com" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">hello@capryos.com</a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
              <div className="space-y-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <div className="w-10 h-10 rounded-md bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                      {social.icon}
                    </div>
                    <div>
                      <p className="font-medium">{social.label}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Stay updated and say hi</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-3">FAQs</h3>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <div>
                  <p className="font-medium">Response time</p>
                  <p>We typically reply within 24 hours on business days.</p>
                </div>
                <div>
                  <p className="font-medium">Collaboration</p>
                  <p>Open to partnerships, guest posts, and speaking opportunities.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Contact;