/*
  # Create portfolio management tables

  1. New Tables
    - `portfolio`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `symbol` (text)
      - `shares` (numeric)
      - `purchase_price` (numeric)
      - `created_at` (timestamp)
    - `watchlist`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `symbol` (text)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
*/

-- Portfolio table
CREATE TABLE IF NOT EXISTS portfolio (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  symbol text NOT NULL,
  shares numeric NOT NULL CHECK (shares > 0),
  purchase_price numeric NOT NULL CHECK (purchase_price > 0),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, symbol)
);

ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their portfolio"
  ON portfolio
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Watchlist table
CREATE TABLE IF NOT EXISTS watchlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  symbol text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, symbol)
);

ALTER TABLE watchlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their watchlist"
  ON watchlist
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);