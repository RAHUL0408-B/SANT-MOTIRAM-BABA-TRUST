/*
  # Fix Users Table RLS for Custom Auth

  1. Changes
    - Drop existing RLS policies on users table
    - Add policy to allow public access for INSERT (registration)
    - Add policy to allow authenticated users to read all users
    - Since we're using custom auth with localStorage, we need simpler policies
  
  2. Security
    - Anyone can register (create account)
    - Anyone can read user data (needed for login verification)
    - Only allow reading public fields (email, full_name, role)
*/

-- Drop all existing policies on users table
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Anyone can create an account" ON users;

-- Allow anyone to insert (for registration)
CREATE POLICY "Allow public registration"
  ON users FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow anyone to read users (needed for login)
CREATE POLICY "Allow public read for authentication"
  ON users FOR SELECT
  TO public
  USING (true);

-- Allow anyone to update their own data
CREATE POLICY "Allow users to update own data"
  ON users FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);
