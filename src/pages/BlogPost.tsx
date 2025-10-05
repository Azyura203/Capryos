import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2, Twitter, Linkedin, Facebook, Eye, Tag } from 'lucide-react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { supabase, type BlogPost } from '../lib/supabase';
import SEOHead from '../components/SEOHead';
import BlogCard from '../components/BlogCard';
import NewsletterSignup from '../components/NewsletterSignup';
import toast from 'react-hot-toast';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchPost(slug);
    }
  }, [slug]);

  const fetchPost = async (postSlug: string) => {
    try {
      setLoading(true);
      setError(null);

      // Fetch the post
      const { data: postData, error: postError } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', postSlug)
        .eq('status', 'published')
        .single();

      if (postError) {
        if (postError.code === 'PGRST116') {
          setError('Post not found');
        } else {
          throw postError;
        }
        return;
      }

      setPost(postData);

      // Increment view count
      await supabase
        .from('blog_posts')
        .update({ views: postData.views + 1 })
        .eq('id', postData.id);

      // Fetch related posts (same tags, excluding current post)
      if (postData.tags.length > 0) {
        const { data: relatedData } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('status', 'published')
          .neq('id', postData.id)
          .overlaps('tags', postData.tags)
          .limit(3);

        setRelatedPosts(relatedData || []);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const sharePost = (platform: string) => {
    if (!post) return;

    const url = window.location.href;
    const title = post.title;
    const text = post.excerpt;

    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 dark:border-gray-700 dark:border-t-blue-500 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="text-center space-y-6 max-w-md px-6">
          <div className="text-6xl font-bold text-gray-300 dark:text-gray-700">
            {error === 'Post not found' ? '404' : '⚠'}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {error === 'Post not found' ? 'Post Not Found' : 'Error Loading Post'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {error === 'Post not found'
              ? 'The post you\'re looking for doesn\'t exist or has been removed.'
              : 'Something went wrong while loading the post.'
            }
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = format(new Date(post.published_at || post.created_at), 'MMMM dd, yyyy');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <SEOHead
        title={post.title}
        description={post.excerpt}
        keywords={post.tags.join(', ')}
        image={post.thumbnail_url}
        type="article"
        author={post.author}
        publishedTime={post.published_at}
        modifiedTime={post.updated_at}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        {/* Back Button */}
        <div className="mb-8 animate-fadeIn">
          <Link
            to="/blog"
            className="group inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back to Blog</span>
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12 animate-slideUp">
          <div className="space-y-8">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={tag}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-semibold border border-blue-200 dark:border-blue-700/50 hover:shadow-md transform hover:scale-105 transition-all duration-200 animate-fadeIn"
                >
                  <Tag className="h-3.5 w-3.5" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white tracking-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              {post.excerpt}
            </p>

            {/* Meta */}
            <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-base shadow-md">
                      {post.author.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900 dark:text-white">{post.author}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Author</span>
                    </div>
                  </div>
                  <div className="h-8 w-px bg-gray-200 dark:bg-gray-700"></div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium">{formattedDate}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium">{post.read_time} min read</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <Eye className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium">{post.views + 1} views</span>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Share:</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => sharePost('twitter')}
                      className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 border border-transparent hover:border-blue-200 dark:hover:border-blue-700/50 transition-all duration-200 transform hover:scale-110 hover:shadow-md"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => sharePost('linkedin')}
                      className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 border border-transparent hover:border-blue-200 dark:hover:border-blue-700/50 transition-all duration-200 transform hover:scale-110 hover:shadow-md"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => sharePost('facebook')}
                      className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 border border-transparent hover:border-blue-200 dark:hover:border-blue-700/50 transition-all duration-200 transform hover:scale-110 hover:shadow-md"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => sharePost('copy')}
                      className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 border border-transparent hover:border-blue-200 dark:hover:border-blue-700/50 transition-all duration-200 transform hover:scale-110 hover:shadow-md"
                      aria-label="Copy link"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {post.thumbnail_url && (
            <div className="mt-10 group">
              <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700 transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.02]">
                <img
                  src={post.thumbnail_url}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none animate-fadeIn" style={{ animationDelay: '200ms' }}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <div className="my-6 rounded-lg overflow-hidden shadow-md ring-1 ring-gray-200 dark:ring-gray-700">
                    <SyntaxHighlighter
                      style={tomorrow}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{
                        margin: 0,
                        borderRadius: 0,
                        padding: '1.25rem',
                        fontSize: '0.875rem',
                        lineHeight: '1.6',
                      }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-20 animate-slideUp" style={{ animationDelay: '400ms' }}>
          <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-800 dark:via-gray-800/50 dark:to-blue-900/20 rounded-3xl p-8 sm:p-12 border border-blue-100 dark:border-blue-900/30 shadow-lg">
            <NewsletterSignup />
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-20 bg-gradient-to-b from-gray-100 via-gray-50 to-white dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-900 py-20 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">Related Articles</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Continue exploring more insights and stories</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <div
                  key={relatedPost.id}
                  className="animate-slideUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <BlogCard post={relatedPost} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPostPage;