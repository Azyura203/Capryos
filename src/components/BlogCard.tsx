import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Eye } from 'lucide-react';
import { format } from 'date-fns';
import type { BlogPost } from '../lib/supabase';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact';
}

const BlogCard: React.FC<BlogCardProps> = ({ post, variant = 'default' }) => {
  const formattedDate = format(new Date(post.published_at || post.created_at), 'MMM dd, yyyy');

  if (variant === 'featured') {
    return (
      <article className="group relative bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
        {post.thumbnail_url && (
          <div className="aspect-video overflow-hidden">
            <img
              src={post.thumbnail_url}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-8">
          <div className="flex items-center space-x-4 text-sm mb-4">
            <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full font-medium">
              Featured
            </span>
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 px-3 py-1 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            <Link to={`/blog/${post.slug}`} className="hover:underline">
              {post.title}
            </Link>
          </h2>
          
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{post.read_time} min read</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{post.views} views</span>
              </div>
            </div>
            <Link
              to={`/blog/${post.slug}`}
              className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-medium hover:underline group"
            >
              <span>Read More</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="group">
        <Link to={`/blog/${post.slug}`} className="block">
          <div className="flex space-x-4">
            {post.thumbnail_url && (
              <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                <img
                  src={post.thumbnail_url}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                {post.title}
              </h3>
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mt-2">
                <span>{formattedDate}</span>
                <span>•</span>
                <span>{post.read_time} min</span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      {post.thumbnail_url && (
        <div className="aspect-video overflow-hidden">
          <Link to={`/blog/${post.slug}`}>
            <img
              src={post.thumbnail_url}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          <Link to={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{post.read_time} min</span>
            </div>
          </div>
          <Link
            to={`/blog/${post.slug}`}
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;