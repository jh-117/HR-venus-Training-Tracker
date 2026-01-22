/*
  # Create Password Reset Function

  1. New Functions
    - `reset_user_password_with_security`: Resets a user's password after verifying security question
  
  2. Security
    - Function validates security answer before allowing password reset
    - Uses Supabase auth to update password securely
*/

-- Create function to reset password with security question verification
CREATE OR REPLACE FUNCTION reset_user_password_with_security(
  p_user_id uuid,
  p_security_answer_hash text,
  p_new_password text
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_stored_hash text;
BEGIN
  -- Get stored security answer hash
  SELECT security_answer_hash INTO v_stored_hash
  FROM profiles
  WHERE id = p_user_id;

  -- Check if profile exists
  IF v_stored_hash IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'Profile not found');
  END IF;

  -- Verify security answer
  IF v_stored_hash != p_security_answer_hash THEN
    RETURN json_build_object('success', false, 'error', 'Invalid security answer');
  END IF;

  -- Update password using Supabase auth
  -- Note: This requires the auth schema access
  UPDATE auth.users
  SET 
    encrypted_password = crypt(p_new_password, gen_salt('bf')),
    updated_at = now()
  WHERE id = p_user_id;

  RETURN json_build_object('success', true, 'message', 'Password reset successfully');
END;
$$;
