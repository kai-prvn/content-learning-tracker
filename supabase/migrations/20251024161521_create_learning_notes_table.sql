/*
  # Create Learning Notes Table

  1. New Tables
    - `learning_notes`
      - `id` (uuid, primary key) - Unique identifier for each note
      - `title` (text) - Title describing the content source
      - `insight` (text) - The key learning or insight captured
      - `topic` (text) - Category: Tech, Fitness, Life, Business, Career, Other
      - `source_url` (text, optional) - Link to the original content
      - `created_at` (timestamptz) - Auto-captured timestamp
      - `user_id` (uuid) - Reference to auth.users for multi-user support
  
  2. Security
    - Enable RLS on `learning_notes` table
    - Add policy for users to read their own notes
    - Add policy for users to insert their own notes
    - Add policy for users to delete their own notes
    - Add policy for users to update their own notes
  
  3. Notes
    - Designed for quick capture and easy retrieval
    - Topic field for categorization
    - Optional source URL for reference
    - User-scoped for privacy
*/

CREATE TABLE IF NOT EXISTS learning_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  insight text NOT NULL,
  topic text NOT NULL DEFAULT 'Other',
  source_url text,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE learning_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notes"
  ON learning_notes FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notes"
  ON learning_notes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notes"
  ON learning_notes FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own notes"
  ON learning_notes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS learning_notes_user_id_idx ON learning_notes(user_id);
CREATE INDEX IF NOT EXISTS learning_notes_created_at_idx ON learning_notes(created_at DESC);