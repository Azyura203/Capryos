import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { ChartBar as BarChart3, Users, FileText, MessageSquare, Plus, Eye, CreditCard as Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { supabase, type BlogPost, type Subscriber, type ContentSuggestion } from '../../lib/supabase';
import toast from 'react-hot-toast';

const Sparkline: React.FC<{ data?: number[] }> = ({ data = [2,4,3,5,6,5,7] }) => {
  const max = Math.max(...data);
  const points = data.map((v, i) => `${(i/(data.length-1))*100},${100 - (v/max)*100}`).join(' ');
  return (
    <svg className="w-20 h-6" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <polyline fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" points={points} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  const statCards = [
    { title: 'Total Posts', value: stats.totalPosts, icon: FileText, color: 'from-blue-500 to-indigo-600' },
    { title: 'Subscribers', value: stats.totalSubscribers, icon: Users, color: 'from-green-400 to-emerald-500' },
    { title: 'Total Views', value: stats.totalViews, icon: Eye, color: 'from-amber-400 to-orange-500' },
    { title: 'Suggestions', value: stats.totalSuggestions, icon: MessageSquare, color: 'from-pink-500 to-rose-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Luxurious Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-600 flex items-center justify-center shadow-2xl ring-1 ring-white/10">
              <img src="public/CAPRYOS-LOGO.jpg" alt="Capryos" className="w-10 h-10 rounded-full object-cover" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Capryos Admin</h1>
              <p className="text-sm text-gray-300/80">Curated insights • Elegant control • Real-time updates</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.open('/admin/stats', '_blank')}
              className="px-4 py-2 rounded-lg bg-white/6 backdrop-blur-sm border border-white/6 text-sm hover:scale-[1.02] transition"
            >
              Insights
            </button>
            <button
              onClick={() => window.open('/admin/posts/new', '_blank')}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-amber-600 text-black font-medium shadow-lg hover:brightness-95 transition"
            >
              New Post
            </button>
          </div>
        </div>

        {/* Stat cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="relative overflow-hidden rounded-2xl p-5 bg-white/5 backdrop-blur-md border border-white/6 shadow-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-gray-300/80 uppercase mb-1">{stat.title}</p>
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-semibold">{stat.value}</h3>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-white/8 border border-white/6">+3.4%</span>
                    </div>
                    <div className="mt-3">
                      <Sparkline />
                    </div>
                  </div>
                  <div className={`p-3 rounded-full bg-gradient-to-tr ${stat.color} shadow-2xl flex items-center justify-center`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                {/* subtle decorative glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-10 bg-gradient-to-tr from-white to-transparent blur-3xl"></div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Posts */}
          <div className="rounded-2xl p-6 bg-white/4 backdrop-blur-md border border-white/6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="flex items-center gap-2 text-lg font-medium"><FileText className="h-5 w-5" />Recent Posts</h2>
              <button onClick={() => window.open('/admin/posts', '_blank')} className="text-sm text-yellow-300/90 hover:underline">View all</button>
            </div>

            <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
              {recentPosts.map(post => (
                <div key={post.id} className="flex items-center justify-between gap-4 p-3 rounded-xl bg-white/3 border border-white/5">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center text-sm font-semibold">{(post.title || 'Post').charAt(0)}</div>
                      <div className="truncate">
                        <p className="font-medium truncate">{post.title}</p>
                        <p className="text-xs text-gray-300/80 truncate">{post.status} • {post.views} views</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => window.open(`/blog/${post.slug}`, '_blank')} className="p-2 rounded-md bg-white/6 hover:bg-white/10">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button onClick={() => window.open(`/admin/posts/edit/${post.id}`, '_blank')} className="p-2 rounded-md bg-white/6 hover:bg-white/10">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button onClick={() => deletePost(post.id)} className="p-2 rounded-md bg-white/6 hover:bg-white/10">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
              {recentPosts.length === 0 && <p className="text-center text-sm text-gray-300/70 py-6">No posts yet</p>}
            </div>
          </div>

          {/* Recent Subscribers & Suggestions stacked */}
          <div className="space-y-6">
            <div className="rounded-2xl p-6 bg-white/4 backdrop-blur-md border border-white/6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="flex items-center gap-2 text-lg font-medium"><Users className="h-5 w-5" />Recent Subscribers</h3>
                <button onClick={() => window.open('/admin/subscribers', '_blank')} className="text-sm text-yellow-300/90 hover:underline">View all</button>
              </div>
              <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                {recentSubscribers.map(s => (
                  <div key={s.id} className="flex items-center justify-between gap-4 p-3 rounded-lg bg-white/3 border border-white/5">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-green-400 to-emerald-500 flex items-center justify-center text-xs font-semibold">{(s.name || 'A').charAt(0)}</div>
                      <div className="truncate">
                        <p className="truncate font-medium">{s.name || 'Anonymous'}</p>
                        <p className="text-xs text-gray-300/80 truncate">{s.email}</p>
                      </div>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-xs ${s.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{s.status}</span>
                    </div>
                  </div>
                ))}
                {recentSubscribers.length === 0 && <p className="text-center text-sm text-gray-300/70 py-6">No subscribers yet</p>}
              </div>
            </div>

            <div className="rounded-2xl p-6 bg-white/4 backdrop-blur-md border border-white/6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="flex items-center gap-2 text-lg font-medium"><MessageSquare className="h-5 w-5" />Content Suggestions</h3>
                <button onClick={() => window.open('/admin/suggestions', '_blank')} className="text-sm text-yellow-300/90 hover:underline">View all</button>
              </div>
              <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                {recentSuggestions.map(s => (
                  <div key={s.id} className="p-3 rounded-lg bg-white/3 border border-white/5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">{s.subject}</p>
                        <p className="text-xs text-gray-300/80 mt-1">{s.message}</p>
                        <p className="text-xs text-gray-400 mt-2">From: {s.name} • {s.email}</p>
                      </div>
                      <div className="shrink-0">
                        <span className={`px-2 py-1 rounded-full text-xs ${s.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : s.status === 'reviewed' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>{s.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {recentSuggestions.length === 0 && <p className="text-center text-sm text-gray-300/70 py-6">No suggestions yet</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;