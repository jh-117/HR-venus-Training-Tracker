/*
  # Add Security Questions to Profiles

  1. Changes
    - Add `security_question` column to `profiles` table
    - Add `security_answer_hash` column to `profiles` table
  
  2. Security
    - Security answers are stored as base64 hashes (not plain text)
    - Used for in-app password reset functionality
*/

-- Add security question and answer hash columns to profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'security_question'
  ) THEN
    ALTER TABLE profiles ADD COLUMN security_question text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'security_answer_hash'
  ) THEN
    ALTER TABLE profiles ADD COLUMN security_answer_hash text;
  END IF;
END $$;
