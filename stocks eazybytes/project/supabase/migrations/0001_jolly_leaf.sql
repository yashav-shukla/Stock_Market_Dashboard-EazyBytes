/*
  # Admin Panel Schema

  1. New Tables
    - `roles`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `created_at` (timestamp)
    
    - `user_roles`
      - `user_id` (uuid, references auth.users)
      - `role_id` (uuid, references roles)
      - `created_at` (timestamp)
    
    - `stock_symbols`
      - `id` (uuid, primary key)
      - `symbol` (text, unique)
      - `name` (text)
      - `enabled` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `user_watchlists`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `symbol_id` (uuid, references stock_symbols)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for admin access
    - Add policies for user access to watchlists
*/

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

-- Create user_roles table
CREATE TABLE IF NOT EXISTS user_roles (
  user_id uuid REFERENCES auth.users NOT NULL,
  role_id uuid REFERENCES roles NOT NULL,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, role_id)
);

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Create stock_symbols table
CREATE TABLE IF NOT EXISTS stock_symbols (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol text UNIQUE NOT NULL,
  name text NOT NULL,
  enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE stock_symbols ENABLE ROW LEVEL SECURITY;

-- Create user_watchlists table
CREATE TABLE IF NOT EXISTS user_watchlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  symbol_id uuid REFERENCES stock_symbols NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, symbol_id)
);

ALTER TABLE user_watchlists ENABLE ROW LEVEL SECURITY;

-- Insert default admin role
INSERT INTO roles (name) VALUES ('admin') ON CONFLICT (name) DO NOTHING;

-- Create RLS policies
CREATE POLICY "Admins can read all roles"
  ON roles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid()
      AND ur.role_id IN (SELECT id FROM roles WHERE name = 'admin')
    )
  );

CREATE POLICY "Admins can manage stock symbols"
  ON stock_symbols
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid()
      AND ur.role_id IN (SELECT id FROM roles WHERE name = 'admin')
    )
  );

CREATE POLICY "Users can read enabled stock symbols"
  ON stock_symbols
  FOR SELECT
  TO authenticated
  USING (enabled = true);

CREATE POLICY "Users can manage their own watchlist"
  ON user_watchlists
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());