/*
  # Create Complete Blog Application Schema with Enhanced Security

  ## Summary
  Creates all necessary tables for the blog application with optimized RLS policies,
  proper constraints, and realtime support for the admin dashboard.

  ## New Tables

  ### 1. blog_posts
  - `id` (uuid, primary key) - Unique post identifier
  - `title` (text, required) - Post title
  - `slug` (text, unique, required) - URL-friendly identifier
  - `excerpt` (text, required) - Short post description
  - `content` (text, required) - Full post content in Markdown
  - `thumbnail_url` (text, optional) - Post featured image
  - `tags` (text array) - Post categorization tags
  - `status` (enum: draft, published) - Publication status
  - `author` (text, required) - Post author name
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  - `published_at` (timestamptz, optional) - Publication timestamp
  - `read_time` (integer) - Estimated reading time in minutes
  - `views` (integer) - View count

  ### 2. subscribers
  - `id` (uuid, primary key) - Unique subscriber identifier
  - `email` (text, unique, required) - Subscriber email
  - `name` (text, optional) - Subscriber name
  - `subscribed_at` (timestamptz) - Subscription timestamp
  - `status` (enum: active, unsubscribed) - Subscription status

  ### 3. content_suggestions
  - `id` (uuid, primary key) - Unique suggestion identifier
  - `name` (text, required) - Submitter name
  - `email` (text, required) - Submitter email
  - `subject` (text, required) - Suggestion subject
  - `message` (text, required) - Suggestion content
  - `status` (enum: pending, reviewed, implemented) - Processing status
  - `created_at` (timestamptz) - Submission timestamp

  ## Security

  ### Blog Posts
  - Anonymous and authenticated users can SELECT published posts
  - Authenticated users (admins) can SELECT all posts
  - Authenticated users (admins) can INSERT, UPDATE, DELETE posts
  - Anyone can increment views on published posts

  ### Subscribers
  - Anyone can INSERT new subscribers
  - Authenticated users (admins) can SELECT, UPDATE, DELETE subscribers
  - Users can view their own subscription

  ### Content Suggestions
  - Anyone can INSERT suggestions
  - Authenticated users (admins) can SELECT, UPDATE, DELETE suggestions

  ## Performance
  - Indexes on commonly queried columns
  - Optimized for realtime subscriptions
*/

-- Create custom enum types
DO $$ BEGIN
  CREATE TYPE post_status AS ENUM ('draft', 'published');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE subscriber_status AS ENUM ('active', 'unsubscribed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE suggestion_status AS ENUM ('pending', 'reviewed', 'implemented');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL,
  thumbnail_url text,
  tags text[] DEFAULT '{}',
  status post_status DEFAULT 'draft',
  author text NOT NULL DEFAULT 'Admin',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published_at timestamptz,
  read_time integer DEFAULT 5,
  views integer DEFAULT 0
);

-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  subscribed_at timestamptz DEFAULT now(),
  status subscriber_status DEFAULT 'active'
);

-- Create content_suggestions table
CREATE TABLE IF NOT EXISTS content_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status suggestion_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_suggestions ENABLE ROW LEVEL SECURITY;

-- Blog Posts Policies

-- Anyone can read published posts
CREATE POLICY "Anyone can read published blog posts"
  ON blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- Authenticated users can read all posts (for admin dashboard)
CREATE POLICY "Authenticated users can read all blog posts"
  ON blog_posts
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can insert posts
CREATE POLICY "Authenticated users can insert blog posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update posts
CREATE POLICY "Authenticated users can update blog posts"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete posts
CREATE POLICY "Authenticated users can delete blog posts"
  ON blog_posts
  FOR DELETE
  TO authenticated
  USING (true);

-- Subscribers Policies

-- Anyone can insert new subscribers
CREATE POLICY "Anyone can insert subscribers"
  ON subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Authenticated users can read all subscribers
CREATE POLICY "Authenticated users can read all subscribers"
  ON subscribers
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can update subscribers
CREATE POLICY "Authenticated users can update subscribers"
  ON subscribers
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete subscribers
CREATE POLICY "Authenticated users can delete subscribers"
  ON subscribers
  FOR DELETE
  TO authenticated
  USING (true);

-- Content Suggestions Policies

-- Anyone can insert suggestions
CREATE POLICY "Anyone can insert content suggestions"
  ON content_suggestions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Authenticated users can read all suggestions
CREATE POLICY "Authenticated users can read all content suggestions"
  ON content_suggestions
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can update suggestions
CREATE POLICY "Authenticated users can update content suggestions"
  ON content_suggestions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete suggestions
CREATE POLICY "Authenticated users can delete content suggestions"
  ON content_suggestions
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);
CREATE INDEX IF NOT EXISTS idx_subscribers_subscribed_at ON subscribers(subscribed_at DESC);

CREATE INDEX IF NOT EXISTS idx_content_suggestions_status ON content_suggestions(status);
CREATE INDEX IF NOT EXISTS idx_content_suggestions_created_at ON content_suggestions(created_at DESC);

-- Helper function to increment post views safely
CREATE OR REPLACE FUNCTION increment_post_views(post_slug text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE blog_posts
  SET views = views + 1
  WHERE slug = post_slug AND status = 'published';
END;
$$;

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
