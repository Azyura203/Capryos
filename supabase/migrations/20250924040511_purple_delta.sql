/*
  # Create admin system enhancements

  1. New Tables
    - `admin_users` - Store admin user information
    - `admin_sessions` - Track admin login sessions

  2. Security
    - Enable RLS on admin tables
    - Add policies for admin access only
    - Create admin management functions

  3. Admin Features
    - Admin user management
    - Session tracking
    - Enhanced permissions
*/

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  name text NOT NULL,
  role text DEFAULT 'admin',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_login timestamptz
);

-- Create admin_sessions table
CREATE TABLE IF NOT EXISTS admin_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id uuid REFERENCES admin_users(id) ON DELETE CASCADE,
  session_token text UNIQUE NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  ip_address inet,
  user_agent text
);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_users
CREATE POLICY "Admins can read all admin users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.email = auth.jwt() ->> 'email'
      AND au.is_active = true
    )
  );

CREATE POLICY "Admins can update admin users"
  ON admin_users
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.email = auth.jwt() ->> 'email'
      AND au.is_active = true
    )
  );

-- Create policies for admin_sessions
CREATE POLICY "Admins can manage their own sessions"
  ON admin_sessions
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.id = admin_user_id
      AND au.email = auth.jwt() ->> 'email'
    )
  );

-- Update blog_posts policies for admin access
DROP POLICY IF EXISTS "Authenticated users can read all blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Admins can manage blog posts" ON blog_posts;

CREATE POLICY "Authenticated users can read all blog posts"
  ON blog_posts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage blog posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.email = auth.jwt() ->> 'email'
      AND au.is_active = true
    )
  );

-- Update subscribers policies for admin access
DROP POLICY IF EXISTS "Authenticated users can read content suggestions" ON content_suggestions;

CREATE POLICY "Admins can read all subscribers"
  ON subscribers
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.email = auth.jwt() ->> 'email'
      AND au.is_active = true
    )
  );

CREATE POLICY "Admins can manage subscribers"
  ON subscribers
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.email = auth.jwt() ->> 'email'
      AND au.is_active = true
    )
  );

-- Update content_suggestions policies for admin access
CREATE POLICY "Admins can read all content suggestions"
  ON content_suggestions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.email = auth.jwt() ->> 'email'
      AND au.is_active = true
    )
  );

CREATE POLICY "Admins can manage content suggestions"
  ON content_suggestions
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.email = auth.jwt() ->> 'email'
      AND au.is_active = true
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_active ON admin_users(is_active);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON admin_sessions(expires_at);

-- Function to create admin user (for initial setup)
CREATE OR REPLACE FUNCTION create_admin_user(
  admin_email text,
  admin_password text,
  admin_name text DEFAULT 'Admin'
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  admin_id uuid;
BEGIN
  -- Insert admin user
  INSERT INTO admin_users (email, password_hash, name)
  VALUES (admin_email, crypt(admin_password, gen_salt('bf')), admin_name)
  RETURNING id INTO admin_id;
  
  RETURN admin_id;
END;
$$;

-- Function to verify admin login
CREATE OR REPLACE FUNCTION verify_admin_login(
  login_email text,
  login_password text
)
RETURNS TABLE(
  user_id uuid,
  email text,
  name text,
  role text
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT au.id, au.email, au.name, au.role
  FROM admin_users au
  WHERE au.email = login_email
    AND au.password_hash = crypt(login_password, au.password_hash)
    AND au.is_active = true;
END;
$$;