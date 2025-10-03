/*
  # Create Complete Blog Application Schema

  ## Summary
  Creates all necessary tables for the blog application with proper security policies,
  indexes, and helper functions for the admin dashboard functionality.

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
  1. Anonymous users can read published posts
  2. Authenticated users (admins) can read all posts including drafts
  3. Authenticated users can create, update, and delete posts

  ### Subscribers
  1. Anyone can subscribe (insert)
  2. Authenticated users (admins) can view, update, and delete subscribers

  ### Content Suggestions
  1. Anyone can submit suggestions (insert)
  2. Authenticated users (admins) can view, update, and delete suggestions

  ## Performance Features
  - Indexes on frequently queried columns
  - Automatic timestamp updates
  - Helper function for incrementing views
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

-- Policy 1: Anyone can read published posts
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'blog_posts' 
    AND policyname = 'Anyone can read published blog posts'
  ) THEN
    CREATE POLICY "Anyone can read published blog posts"
      ON blog_posts
      FOR SELECT
      TO anon, authenticated
      USING (status = 'published');
  END IF;
END $$;

-- Policy 2: Authenticated users can read all posts
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'blog_posts' 
    AND policyname = 'Authenticated users can read all blog posts'
  ) THEN
    CREATE POLICY "Authenticated users can read all blog posts"
      ON blog_posts
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;

-- Policy 3: Authenticated users can insert posts
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'blog_posts' 
    AND policyname = 'Authenticated users can insert blog posts'
  ) THEN
    CREATE POLICY "Authenticated users can insert blog posts"
      ON blog_posts
      FOR INSERT
      TO authenticated
      WITH CHECK (true);
  END IF;
END $$;

-- Policy 4: Authenticated users can update posts
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'blog_posts' 
    AND policyname = 'Authenticated users can update blog posts'
  ) THEN
    CREATE POLICY "Authenticated users can update blog posts"
      ON blog_posts
      FOR UPDATE
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- Policy 5: Authenticated users can delete posts
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'blog_posts' 
    AND policyname = 'Authenticated users can delete blog posts'
  ) THEN
    CREATE POLICY "Authenticated users can delete blog posts"
      ON blog_posts
      FOR DELETE
      TO authenticated
      USING (true);
  END IF;
END $$;

-- Subscribers Policies

-- Policy 1: Anyone can insert new subscribers
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'subscribers' 
    AND policyname = 'Anyone can insert subscribers'
  ) THEN
    CREATE POLICY "Anyone can insert subscribers"
      ON subscribers
      FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);
  END IF;
END $$;

-- Policy 2: Authenticated users can read all subscribers
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'subscribers' 
    AND policyname = 'Authenticated users can read all subscribers'
  ) THEN
    CREATE POLICY "Authenticated users can read all subscribers"
      ON subscribers
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;

-- Policy 3: Authenticated users can update subscribers
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'subscribers' 
    AND policyname = 'Authenticated users can update subscribers'
  ) THEN
    CREATE POLICY "Authenticated users can update subscribers"
      ON subscribers
      FOR UPDATE
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- Policy 4: Authenticated users can delete subscribers
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'subscribers' 
    AND policyname = 'Authenticated users can delete subscribers'
  ) THEN
    CREATE POLICY "Authenticated users can delete subscribers"
      ON subscribers
      FOR DELETE
      TO authenticated
      USING (true);
  END IF;
END $$;

-- Content Suggestions Policies

-- Policy 1: Anyone can insert suggestions
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'content_suggestions' 
    AND policyname = 'Anyone can insert content suggestions'
  ) THEN
    CREATE POLICY "Anyone can insert content suggestions"
      ON content_suggestions
      FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);
  END IF;
END $$;

-- Policy 2: Authenticated users can read all suggestions
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'content_suggestions' 
    AND policyname = 'Authenticated users can read all content suggestions'
  ) THEN
    CREATE POLICY "Authenticated users can read all content suggestions"
      ON content_suggestions
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;

-- Policy 3: Authenticated users can update suggestions
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'content_suggestions' 
    AND policyname = 'Authenticated users can update content suggestions'
  ) THEN
    CREATE POLICY "Authenticated users can update content suggestions"
      ON content_suggestions
      FOR UPDATE
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- Policy 4: Authenticated users can delete suggestions
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'content_suggestions' 
    AND policyname = 'Authenticated users can delete content suggestions'
  ) THEN
    CREATE POLICY "Authenticated users can delete content suggestions"
      ON content_suggestions
      FOR DELETE
      TO authenticated
      USING (true);
  END IF;
END $$;

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