import React from 'react';
import { useState, useEffect } from 'react';
import { Search, Filter, Calendar, Clock, ArrowRight, BookOpen, Loader } from 'lucide-react';
import { supabase, type BlogPost } from '../lib/supabase';
import SEOHead from '../components/SEOHead';
import BlogCard from '../components/BlogCard';
import NewsletterSignup from '../components/NewsletterSignup';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) throw error;
      
      setPosts(data || []);
      
      // Extract unique tags
      const tags = new Set<string>();
      data?.forEach(post => {
        post.tags.forEach(tag => tags.add(tag));
      });
      setAllTags(Array.from(tags).sort());
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  const categories = [
    { name: 'All Posts', count: posts.length, color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' },
    ...allTags.map(tag => ({
      name: tag,
      count: posts.filter(post => post.tags.includes(tag)).length,
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
    }))
  ];

  if (loading) {
    return (
      <div className="py-20">
        <SEOHead
          title="Blog - Capryos"
          description="Read the latest insights on crypto, business strategies, and entrepreneurship from the Capryos team."
        />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader className="h-12 w-12 animate-spin text-blue-600 dark:text-blue-400 mx-auto" />
            <p className="text-gray-600 dark:text-gray-300">Loading articles...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20">
      <SEOHead
        title="Blog - Capryos"
        description="Read the latest insights on crypto, business strategies, and entrepreneurship from the Capryos team."
        keywords="crypto blog, business blog, entrepreneurship articles, DeFi guides, startup advice"
      />
      
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 mb-20">
        <BookOpen className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto" />
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold">Capryos Blog</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            {posts.length > 0 
              ? `${posts.length} articles on crypto, business strategies, and entrepreneurship. Learn from real experiences and practical case studies.`
              : 'Deep insights into crypto, business strategies, and entrepreneurship coming soon.'
            }
          </p>
        </div>
        
        {/* Search and Filter */}
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            />
          </div>
          
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedTag('')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  !selectedTag
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedTag === tag
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  {searchTerm || selectedTag ? 'No articles found' : 'No articles yet'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  {searchTerm || selectedTag 
                    ? 'Try adjusting your search or filter criteria.'
                    : 'We\'re working on fresh content to help you navigate crypto and business.'
                  }
                </p>
                {(searchTerm || selectedTag) && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedTag('');
                    }}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Featured Post */}
                {featuredPost && (
                  <div className="mb-12">
                    <BlogCard post={featuredPost} variant="featured" />
                  </div>
                )}

                {/* All Posts */}
                {regularPosts.length > 0 && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold">
                      {searchTerm || selectedTag ? 'Search Results' : 'All Articles'}
                      <span className="text-lg font-normal text-gray-500 dark:text-gray-400 ml-2">
                        ({filteredPosts.length})
                      </span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {regularPosts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Newsletter CTA */}
            {posts.length > 0 && (
              <div className="mt-16">
                <NewsletterSignup />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories */}
            {categories.length > 1 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Categories</h3>
                <div className="space-y-3">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedTag(category.name === 'All Posts' ? '' : category.name)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${
                        (category.name === 'All Posts' && !selectedTag) || selectedTag === category.name
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span className="font-medium">{category.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${category.color}`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter CTA */}
            <NewsletterSignup variant="compact" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;