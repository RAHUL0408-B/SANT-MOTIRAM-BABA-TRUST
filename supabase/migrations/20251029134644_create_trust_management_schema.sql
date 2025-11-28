/*
  # Trust Member Management Portal Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `password` (text, bcrypt hashed)
      - `full_name` (text)
      - `role` (text, default 'user', can be 'admin' or 'user')
      - `created_at` (timestamptz)
    
    - `members`
      - `id` (uuid, primary key)
      - `joining_date` (date)
      - `full_name` (text)
      - `village` (text)
      - `post` (text)
      - `taluka` (text)
      - `district` (text)
      - `state` (text)
      - `pincode` (text)
      - `notes` (text)
      - `added_by` (uuid, foreign key to users)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `programs`
      - `id` (uuid, primary key)
      - `title` (text)
      - `date` (date)
      - `location` (text)
      - `description` (text)
      - `image_url` (text)
      - `created_by` (uuid, foreign key to users)
      - `created_at` (timestamptz)
    
    - `address_data`
      - `id` (uuid, primary key)
      - `village` (text)
      - `taluka` (text)
      - `district` (text)
      - `state` (text, default 'महाराष्ट्र')
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their data
    - Admin role can access all data
    - Regular users can view members and programs
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  full_name text NOT NULL,
  role text DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Members table
CREATE TABLE IF NOT EXISTS members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  joining_date date NOT NULL,
  full_name text NOT NULL,
  village text NOT NULL,
  post text,
  taluka text,
  district text,
  state text DEFAULT 'महाराष्ट्र',
  pincode text,
  notes text,
  added_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view members"
  ON members FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert members"
  ON members FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = added_by);

CREATE POLICY "Users can update own added members"
  ON members FOR UPDATE
  TO authenticated
  USING (auth.uid() = added_by)
  WITH CHECK (auth.uid() = added_by);

CREATE POLICY "Users can delete own added members"
  ON members FOR DELETE
  TO authenticated
  USING (auth.uid() = added_by);

-- Programs table
CREATE TABLE IF NOT EXISTS programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  date date NOT NULL,
  location text NOT NULL,
  description text,
  image_url text,
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view programs"
  ON programs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create programs"
  ON programs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own programs"
  ON programs FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can delete own programs"
  ON programs FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- Address data table
CREATE TABLE IF NOT EXISTS address_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  village text NOT NULL,
  taluka text NOT NULL,
  district text NOT NULL,
  state text DEFAULT 'महाराष्ट्र',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE address_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view address data"
  ON address_data FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_members_district ON members(district);
CREATE INDEX IF NOT EXISTS idx_members_taluka ON members(taluka);
CREATE INDEX IF NOT EXISTS idx_members_village ON members(village);
CREATE INDEX IF NOT EXISTS idx_address_village ON address_data(village);
CREATE INDEX IF NOT EXISTS idx_address_district ON address_data(district);

-- Insert sample address data for Maharashtra
INSERT INTO address_data (village, taluka, district, state) VALUES
  ('भुगाव', 'साकोली ', 'भंडारा ' , 'महाराष्ट्र'),
  ('चिखली', 'खामगांव', 'बुलढाणा', 'महाराष्ट्र'),
  ('मोताळा', 'खामगांव', 'बुलढाणा', 'महाराष्ट्र'),
  ('शेगाव', 'शेगाव', 'बुलढाणा', 'महाराष्ट्र'),
  ('मलकापूर', 'मलकापूर', 'बुलढाणा', 'महाराष्ट्र'),
  ('जळगांव जामोद', 'जळगांव जामोद', 'बुलढाणा', 'महाराष्ट्र'),
  ('नांदुरा', 'नांदुरा', 'बुलढाणा', 'महाराष्ट्र'),
  ('देउळगांव राजा', 'देउळगांव राजा', 'बुलढाणा', 'महाराष्ट्र'),
  ('सांगवी', 'खामगांव', 'बुलढाणा', 'महाराष्ट्र'),
  ('पिंपळगांव', 'खामगांव', 'बुलढाणा', 'महाराष्ट्र')
ON CONFLICT DO NOTHING;