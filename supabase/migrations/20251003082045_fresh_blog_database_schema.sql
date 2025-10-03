/*
  # Fresh Blog Database Schema

  ## Summary
  Creates a complete blog application schema from scratch with all necessary tables,
  security policies, indexes, and helper functions.

  ## New Tables

  ### 1. blog_posts
  - `id` (uuid, primary key) - Unique post identifier
  - `title` (text, required) - Post title
  - `slug` (text, unique, required) - URL-friendly identifier
  - `excerpt` (text, required) - Short post description
  - `content` (text, required) - Full post content in Markdown
  - `thumbnail_url` (text, optional) - Post featured image URL
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
  - `email` (text, unique, required) - Subscriber email address
  - `name` (text, optional) - Subscriber name
  - `subscribed_at` (timestamptz) - Subscription timestamp
  - `status` (enum: active, unsubscribed) - Subscription status

  ### 3. content_suggestions
  - `id` (uuid, primary key) - Unique suggestion identifier
  - `name` (text, required) - Submitter name
  - `email` (text, required) - Submitter email
  - `subject` (text, required) - Suggestion subject
  - `message` (text, required) - Suggestion details
  - `status` (enum: pending, reviewed, implemented) - Processing status
  - `created_at` (timestamptz) - Submission timestamp

  ## Security (RLS Policies)

  ### Blog Posts
  1. Anonymous users can read published posts only
  2. Authenticated users (admins) can read all posts including drafts
  3. Authenticated users can create, update, and delete all posts

  ### Subscribers
  1. Anyone can subscribe (insert new subscribers)
  2. Authenticated users (admins) can view, update, and delete subscribers

  ### Content Suggestions
  1. Anyone can submit suggestions (insert)
  2. Authenticated users (admins) can view, update, and delete suggestions

  ## Performance Features
  - Indexes on frequently queried columns for fast lookups
  - Automatic timestamp updates on post modifications
  - Helper function for incrementing post views safely
*/

-- Create custom enum types for type safety
CREATE TYPE post_status AS ENUM ('draft', 'published');
CREATE TYPE subscriber_status AS ENUM ('active', 'unsubscribed');
CREATE TYPE suggestion_status AS ENUM ('pending', 'reviewed', 'implemented');

-- Create blog_posts table
CREATE TABLE blog_posts (
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
CREATE TABLE subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  subscribed_at timestamptz DEFAULT now(),
  status subscriber_status DEFAULT 'active'
);

-- Create content_suggestions table
CREATE TABLE content_suggestions (
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

-- Blog Posts RLS Policies

CREATE POLICY "Public can view published posts"
  ON blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "Admins can view all posts"
  ON blog_posts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can create posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update posts"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can delete posts"
  ON blog_posts
  FOR DELETE
  TO authenticated
  USING (true);

-- Subscribers RLS Policies

CREATE POLICY "Anyone can subscribe"
  ON subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view subscribers"
  ON subscribers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update subscribers"
  ON subscribers
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can delete subscribers"
  ON subscribers
  FOR DELETE
  TO authenticated
  USING (true);

-- Content Suggestions RLS Policies

CREATE POLICY "Anyone can submit suggestions"
  ON content_suggestions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view suggestions"
  ON content_suggestions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update suggestions"
  ON content_suggestions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can delete suggestions"
  ON content_suggestions
  FOR DELETE
  TO authenticated
  USING (true);

-- Create performance indexes

CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);

CREATE INDEX idx_subscribers_email ON subscribers(email);
CREATE INDEX idx_subscribers_status ON subscribers(status);
CREATE INDEX idx_subscribers_subscribed_at ON subscribers(subscribed_at DESC);

CREATE INDEX idx_content_suggestions_status ON content_suggestions(status);
CREATE INDEX idx_content_suggestions_created_at ON content_suggestions(created_at DESC);

-- Helper function to safely increment post views
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

-- Create trigger to auto-update updated_at on blog_posts
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();