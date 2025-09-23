import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail_url?: string;
  tags: string[];
  status: 'draft' | 'published';
  author: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
  read_time: number;
  views: number;
}

export interface Subscriber {
  id: string;
  email: string;
  name?: string;
  subscribed_at: string;
  status: 'active' | 'unsubscribed';
}

export interface ContentSuggestion {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'pending' | 'reviewed' | 'implemented';
  created_at: string;
}

export interface Analytics {
  total_posts: number;
  total_subscribers: number;
  total_views: number;
  recent_posts: BlogPost[];
  popular_posts: BlogPost[];
}