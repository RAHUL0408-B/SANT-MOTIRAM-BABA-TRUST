/*
  # Fix User Registration Policy

  1. Changes
    - Add policy to allow anyone to insert new users (for registration)
    - Keep existing policies for reading/updating own data
  
  2. Security
    - Users can only read and update their own data
    - Anyone can create a new account (registration)
*/

-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can create an account" ON users;

-- Allow anyone to insert new users (for registration)
CREATE POLICY "Anyone can create an account"
  ON users FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
