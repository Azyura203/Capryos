import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { Save, Eye, ArrowLeft, Upload, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { supabase, type BlogPost } from '../../lib/supabase';
import toast from 'react-hot-toast';

const PostEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [post, setPost] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    thumbnail_url: '',
    tags: [],
    status: 'draft',
    author: 'Kane',
    read_time: 5
  });
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (user && id && id !== 'new') {
      fetchPost();
    }
  }, [user, id]);

  const fetchPost = async () => {
    if (!id || id === 'new') return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
      toast.error('Failed to load post');
      navigate('/admin');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setPost(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !post.tags?.includes(newTag.trim())) {
      setPost(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setPost(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  const handleContentChange = (content: string) => {
    setPost(prev => ({
      ...prev,
      content,
      read_time: calculateReadTime(content)
    }));
  };

  const savePost = async (status: 'draft' | 'published') => {
    if (!post.title || !post.content) {
      toast.error('Title and content are required');
      return;
    }

    try {
      setSaving(true);
      const postData = {
        ...post,
        status,
        published_at: status === 'published' ? new Date().toISOString() : null,
        updated_at: new Date().toISOString()
      };

      if (id === 'new' || !id) {
        // Create new post
        const { data, error } = await supabase
          .from('blog_posts')
          .insert([{
            title: postData.title,
            slug: postData.slug,
            excerpt: postData.excerpt || '',
            content: postData.content,
            thumbnail_url: postData.thumbnail_url || null,
            tags: postData.tags || [],
            status,
            author: postData.author || 'Admin',
            read_time: postData.read_time || 5,
            published_at: status === 'published' ? new Date().toISOString() : null
          }])
          .select()
          .single();

        if (error) throw error;
        toast.success(`Post ${status === 'published' ? 'published' : 'saved'} successfully!`);
        navigate(`/admin/posts/edit/${data.id}`);
      } else {
        // Update existing post
        const { error } = await supabase
          .from('blog_posts')
          .update({
            title: postData.title,
            slug: postData.slug,
            excerpt: postData.excerpt || '',
            content: postData.content,
            thumbnail_url: postData.thumbnail_url || null,
            tags: postData.tags || [],
            status,
            author: postData.author || 'Admin',
            read_time: postData.read_time || 5,
            published_at: status === 'published' ? (post.published_at || new Date().toISOString()) : null
          })
          .eq('id', id);

        if (error) throw error;
        toast.success(`Post ${status === 'published' ? 'published' : 'updated'} successfully!`);
        fetchPost();
      }
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('Failed to save post');
    } finally {
      setSaving(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black text-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin')}
              className="p-2 rounded-lg bg-white/6 backdrop-blur-sm border border-white/6 text-sm hover:scale-[1.02] transition"
              aria-label="Back to dashboard"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight"> {id === 'new' ? 'Create New Post' : 'Edit Post'} </h1>
              <p className="text-sm text-gray-300/80">Craft beautiful posts with the premium editor</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {post.slug && (
              <button
                onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                className="px-3 py-2 rounded-lg bg-white/6 backdrop-blur-sm border border-white/6 text-sm hover:brightness-95 transition"
              >
                <Eye className="h-4 w-4 inline-block mr-2" />
                Preview
              </button>
            )}

            <button
              onClick={() => savePost('draft')}
              disabled={saving || !post.title || !post.content}
              className="px-4 py-2 rounded-lg bg-white/6 backdrop-blur-sm border border-white/6 text-sm hover:brightness-95 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              <span>{saving ? 'Saving...' : 'Save Draft'}</span>
            </button>

            <button
              onClick={() => savePost('published')}
              disabled={saving || !post.title || !post.content}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-amber-600 text-black font-medium shadow-lg hover:brightness-95 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              <span>{saving ? 'Publishing...' : 'Publish'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="rounded-2xl p-6 bg-white/4 backdrop-blur-md border border-white/6 shadow-2xl">
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input
                type="text"
                value={post.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors duration-200 text-xl font-semibold"
                placeholder="Enter post title..."
              />
              {post.slug && (
                <p className="mt-2 text-sm text-gray-300/70">
                  URL: <span className="text-yellow-300">/blog/{post.slug}</span>
                </p>
              )}
            </div>

            {/* Excerpt */}
            <div className="rounded-2xl p-6 bg-white/4 backdrop-blur-md border border-white/6 shadow-2xl">
              <label className="block text-sm font-medium text-gray-300 mb-2">Excerpt</label>
              <textarea
                value={post.excerpt}
                onChange={(e) => setPost(prev => ({ ...prev, excerpt: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors duration-200 resize-none"
                placeholder="Brief description of your post..."
              />
            </div>

            {/* Content */}
            <div className="rounded-2xl p-6 bg-white/4 backdrop-blur-md border border-white/6 shadow-2xl">
              <label className="block text-sm font-medium text-gray-300 mb-2">Content (Markdown)</label>
              <textarea
                value={post.content}
                onChange={(e) => handleContentChange(e.target.value)}
                rows={18}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors duration-200 resize-none font-mono text-sm"
                placeholder="Write your post content in Markdown..."
              />
              <p className="mt-2 text-sm text-gray-300/70">Estimated read time: <span className="text-yellow-300">{post.read_time}</span> minutes</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Post Settings */}
            <div className="rounded-2xl p-6 bg-white/4 backdrop-blur-md border border-white/6 shadow-2xl">
              <h3 className="text-lg font-medium text-gray-100 mb-4">Post Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                  <select
                    value={post.status}
                    onChange={(e) => setPost(prev => ({ ...prev, status: e.target.value as 'draft' | 'published' }))}
                    className="w-full px-3 py-2 rounded-lg border border-white/8 bg-transparent text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Author</label>
                  <input
                    type="text"
                    value={post.author}
                    onChange={(e) => setPost(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-white/8 bg-transparent text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Thumbnail URL</label>
                  <input
                    type="url"
                    value={post.thumbnail_url}
                    onChange={(e) => setPost(prev => ({ ...prev, thumbnail_url: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-white/8 bg-transparent text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="https://example.com/image.jpg"
                  />
                  {post.thumbnail_url && (
                    <img
                      src={post.thumbnail_url}
                      alt="Thumbnail preview"
                      className="mt-2 w-full h-36 object-cover rounded-lg border border-white/6"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="rounded-2xl p-6 bg-white/4 backdrop-blur-md border border-white/6 shadow-2xl">
              <h3 className="text-lg font-medium text-gray-100 mb-4">Tags</h3>
              
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 px-3 py-2 rounded-lg border border-white/8 bg-transparent text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="Add tag..."
                  />
                  <button
                    onClick={addTag}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-amber-600 text-black font-medium shadow hover:brightness-95 transition"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {post.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 bg-white/6 border border-white/6 text-gray-100 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      <span className="truncate max-w-xs">{tag}</span>
                      <button
                        onClick={() => removeTag(tag)}
                        className="p-1 hover:text-yellow-300"
                        aria-label={`Remove ${tag}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PostEditor;