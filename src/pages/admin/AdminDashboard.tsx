import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { ChartBar as BarChart3, Users, FileText, MessageSquare, Plus, Eye, CreditCard as Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { supabase, type BlogPost, type Subscriber, type ContentSuggestion } from '../../lib/supabase';
import toast from 'react-hot-toast';

const AdminDashboard: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalSubscribers: 0,
    totalViews: 0,
    totalSuggestions: 0
  });
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [recentSubscribers, setRecentSubscribers] = useState<Subscriber[]>([]);
  const [recentSuggestions, setRecentSuggestions] = useState<ContentSuggestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();

      // Set up realtime subscriptions
      const postsSubscription = supabase
        .channel('posts-changes')
        .on('postgres_changes',
          { event: '*', schema: 'public', table: 'blog_posts' },
          () => fetchDashboardData()
        )
        .subscribe();

      const subscribersSubscription = supabase
        .channel('subscribers-changes')
        .on('postgres_changes',
          { event: '*', schema: 'public', table: 'subscribers' },
          () => fetchDashboardData()
        )
        .subscribe();

      const suggestionsSubscription = supabase
        .channel('suggestions-changes')
        .on('postgres_changes',
          { event: '*', schema: 'public', table: 'content_suggestions' },
          () => fetchDashboardData()
        )
        .subscribe();

      return () => {
        postsSubscription.unsubscribe();
        subscribersSubscription.unsubscribe();
        suggestionsSubscription.unsubscribe();
      };
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch stats
      const [postsResult, subscribersResult, suggestionsResult] = await Promise.all([
        supabase.from('blog_posts').select('views', { count: 'exact' }),
        supabase.from('subscribers').select('*', { count: 'exact' }),
        supabase.from('content_suggestions').select('*', { count: 'exact' })
      ]);

      const totalViews = postsResult.data?.reduce((sum, post) => sum + (post.views || 0), 0) || 0;

      setStats({
        totalPosts: postsResult.count || 0,
        totalSubscribers: subscribersResult.count || 0,
        totalViews,
        totalSuggestions: suggestionsResult.count || 0
      });

      // Fetch recent data
      const [recentPostsResult, recentSubscribersResult, recentSuggestionsResult] = await Promise.all([
        supabase.from('blog_posts').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('subscribers').select('*').order('subscribed_at', { ascending: false }).limit(5),
        supabase.from('content_suggestions').select('*').order('created_at', { ascending: false }).limit(5)
      ]);

      setRecentPosts(recentPostsResult.data || []);
      setRecentSubscribers(recentSubscribersResult.data || []);
      setRecentSuggestions(recentSuggestionsResult.data || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) throw error;
      
      toast.success('Post deleted successfully');
      fetchDashboardData();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const statCards = [
    { title: 'Total Posts', value: stats.totalPosts, icon: FileText, color: 'bg-blue-500' },
    { title: 'Subscribers', value: stats.totalSubscribers, icon: Users, color: 'bg-green-500' },
    { title: 'Total Views', value: stats.totalViews, icon: Eye, color: 'bg-amber-500' },
    { title: 'Suggestions', value: stats.totalSuggestions, icon: MessageSquare, color: 'bg-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-300">Welcome back! Here's what's happening with your blog.</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => window.open('/admin/posts/new', '_blank')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>New Post</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white animate-fadeIn">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color} shadow-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Posts */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-slideUp">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Recent Posts</span>
              </h2>
              <button
                onClick={() => window.open('/admin/posts', '_blank')}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium transition-all hover:translate-x-1"
              >
                View All →
              </button>
            </div>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white truncate">{post.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {post.status} • {post.views} views
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => window.open(`/admin/posts/edit/${post.id}`, '_blank')}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
              {recentPosts.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No posts yet</p>
              )}
            </div>
          </div>

          {/* Recent Subscribers */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-slideUp" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Recent Subscribers</span>
              </h2>
              <button
                onClick={() => window.open('/admin/subscribers', '_blank')}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium transition-all hover:translate-x-1"
              >
                View All →
              </button>
            </div>
            <div className="space-y-4">
              {recentSubscribers.map((subscriber) => (
                <div key={subscriber.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{subscriber.name || 'Anonymous'}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{subscriber.email}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    subscriber.status === 'active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {subscriber.status}
                  </span>
                </div>
              ))}
              {recentSubscribers.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No subscribers yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Suggestions */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-slideUp" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Recent Content Suggestions</span>
            </h2>
            <button
              onClick={() => window.open('/admin/suggestions', '_blank')}
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium transition-all hover:translate-x-1"
            >
              View All →
            </button>
          </div>
          <div className="space-y-4">
            {recentSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-all duration-200 hover:scale-[1.01]">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">{suggestion.subject}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{suggestion.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      From: {suggestion.name} ({suggestion.email})
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    suggestion.status === 'pending' 
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      : suggestion.status === 'reviewed'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                    {suggestion.status}
                  </span>
                </div>
              </div>
            ))}
            {recentSuggestions.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">No suggestions yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;