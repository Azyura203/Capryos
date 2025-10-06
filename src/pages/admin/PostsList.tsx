import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Plus, Search, ListFilter as Filter, Eye, CreditCard as Edit, Trash2, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../../hooks/useAuth';
import { supabase, type BlogPost } from '../../lib/supabase';
import toast from 'react-hot-toast';

const PostsList: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published'>('all');

  useEffect(() => {
    if (user) {
      fetchPosts();

      // Set up realtime subscription
      const subscription = supabase
        .channel('posts-list-changes')
        .on('postgres_changes',
          { event: '*', schema: 'public', table: 'blog_posts' },
          () => fetchPosts()
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [user]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) throw error;
      
      toast.success('Post deleted successfully');
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ 
          status: newStatus,
          published_at: newStatus === 'published' ? new Date().toISOString() : null
        })
        .eq('id', id);

      if (error) throw error;
      
      toast.success(`Post ${newStatus === 'published' ? 'published' : 'unpublished'} successfully`);
      fetchPosts();
    } catch (error) {
      console.error('Error updating post status:', error);
      toast.error('Failed to update post status');
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

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">All Posts</h1>
            <p className="text-gray-300/80 mt-1">Manage your blog posts — premium layout</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex-1 sm:flex-none">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/8 bg-white/3 text-gray-100 placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>

            <div className="ml-2 flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/4 border border-white/6">
                <Filter className="h-5 w-5 text-gray-300" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as 'all' | 'draft' | 'published')}
                  className="bg-transparent text-sm text-gray-100 outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <Link
                to="/admin/posts/new"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-amber-600 text-black font-medium shadow hover:brightness-95"
              >
                <Plus className="h-4 w-4" />
                New Post
              </Link>
            </div>
          </div>
        </div>

        {/* Posts grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-300/70 mb-6">
              {searchTerm || statusFilter !== 'all' ? 'No posts match your filters' : 'No posts yet'}
            </p>
            <Link
              to="/admin/posts/new"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-amber-600 text-black font-medium shadow"
            >
              Create Your First Post
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="relative rounded-2xl p-5 bg-white/4 backdrop-blur-md border border-white/6 shadow-2xl overflow-hidden"
              >
                <div className="flex gap-4">
                  <div className="w-28 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center text-white font-semibold text-lg">
                    {post.thumbnail_url ? (
                      <img src={post.thumbnail_url} alt={post.title} className="w-full h-full object-cover" />
                    ) : (
                      (post.title || 'P').charAt(0)
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold truncate text-white">{post.title}</h3>
                        <p className="text-sm text-gray-300/80 mt-1 line-clamp-2">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {(post.tags || []).slice(0, 4).map((tag) => (
                            <span key={tag} className="inline-block bg-white/6 text-yellow-300 px-2 py-1 rounded-full text-xs font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {post.status}
                        </div>
                        <div className="text-xs text-gray-300/80 mt-2">
                          {post.read_time} min • {format(new Date(post.created_at), 'MMM dd, yyyy')}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 text-sm text-gray-300/80">
                        <div className="inline-flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{post.views}</span>
                        </div>
                        <div className="inline-flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.read_time}m</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-md bg-white/6 hover:bg-white/10"
                          title="View Post"
                        >
                          <Eye className="h-4 w-4 text-gray-100" />
                        </a>

                        <Link
                          to={`/admin/posts/edit/${post.id}`}
                          className="p-2 rounded-md bg-white/6 hover:bg-white/10"
                          title="Edit Post"
                        >
                          <Edit className="h-4 w-4 text-gray-100" />
                        </Link>

                        <button
                          onClick={() => deletePost(post.id, post.title)}
                          className="p-2 rounded-md bg-white/6 hover:bg-white/10"
                          title="Delete Post"
                        >
                          <Trash2 className="h-4 w-4 text-gray-100" />
                        </button>

                        <button
                          onClick={() => toggleStatus(post.id, post.status)}
                          className="px-3 py-1 rounded-full text-xs bg-white/6 hover:bg-white/10"
                          title={post.status === 'published' ? 'Unpublish' : 'Publish'}
                        >
                          {post.status === 'published' ? 'Unpublish' : 'Publish'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* decorative glow */}
                <div className="pointer-events-none absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-10 bg-gradient-to-tr from-white to-transparent blur-3xl"></div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsList;