import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { supabase } from '../lib/supabase';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordResetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PasswordResetModal({ isOpen, onClose }: PasswordResetModalProps) {
  const [step, setStep] = useState<'email' | 'security' | 'newPassword'>('email');
  const [email, setEmail] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClose = () => {
    setStep('email');
    setEmail('');
    setSecurityQuestion('');
    setSecurityAnswer('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setUserId('');
    onClose();
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, security_question')
        .eq('email', email)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        setError('No account found with this email address');
        setLoading(false);
        return;
      }

      if (!data.security_question) {
        setError('This account does not have a security question set up');
        setLoading(false);
        return;
      }

      setUserId(data.id);
      setSecurityQuestion(data.security_question);
      setStep('security');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }

    setLoading(false);
  };

  const handleSecurityAnswerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('security_answer_hash')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        setError('Profile not found');
        setLoading(false);
        return;
      }

      const answerHash = btoa(securityAnswer.toLowerCase().trim());

      if (answerHash !== data.security_answer_hash) {
        setError('Incorrect answer to security question');
        setLoading(false);
        return;
      }

      setStep('newPassword');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }

    setLoading(false);
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const answerHash = btoa(securityAnswer.toLowerCase().trim());

      const { data, error } = await supabase.rpc('reset_user_password_with_security', {
        p_user_id: userId,
        p_security_answer_hash: answerHash,
        p_new_password: newPassword
      });

      if (error) {
        throw error;
      }

      if (data && !data.success) {
        throw new Error(data.error || 'Unable to reset password');
      }

      alert('Password reset successfully! You can now sign in with your new password.');
      handleClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred while resetting password');
    }

    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-slate-900 border-slate-800 text-slate-100 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Reset Password</DialogTitle>
          <DialogDescription className="text-slate-400">
            {step === 'email' && 'Enter your email address to begin password reset'}
            {step === 'security' && 'Answer your security question'}
            {step === 'newPassword' && 'Enter your new password'}
          </DialogDescription>
        </DialogHeader>

        {step === 'email' && (
          <form onSubmit={handleEmailSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">Email Address</Label>
              <Input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="bg-slate-950 border-slate-700"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-2 justify-end">
              <Button type="button" variant="ghost" onClick={handleClose} className="text-slate-400">
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                {loading ? 'Checking...' : 'Continue'}
              </Button>
            </div>
          </form>
        )}

        {step === 'security' && (
          <form onSubmit={handleSecurityAnswerSubmit} className="space-y-4 py-4">
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
              <div className="text-sm text-slate-400 mb-1">Security Question</div>
              <div className="text-slate-200 font-medium">{securityQuestion}</div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="security-answer">Your Answer</Label>
              <Input
                id="security-answer"
                type="text"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                placeholder="Enter your answer"
                required
                className="bg-slate-950 border-slate-700"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-2 justify-end">
              <Button type="button" variant="ghost" onClick={() => setStep('email')} className="text-slate-400">
                Back
              </Button>
              <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                {loading ? 'Verifying...' : 'Verify'}
              </Button>
            </div>
          </form>
        )}

        {step === 'newPassword' && (
          <form onSubmit={handlePasswordReset} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  minLength={6}
                  className="bg-slate-950 border-slate-700 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                  minLength={6}
                  className="bg-slate-950 border-slate-700 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-2 justify-end">
              <Button type="button" variant="ghost" onClick={handleClose} className="text-slate-400">
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                {loading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
