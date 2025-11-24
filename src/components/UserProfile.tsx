import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserProfile({ isOpen, onClose }: UserProfileProps) {
  const { user, signOut } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
const [isEditingName, setIsEditingName] = useState(false);


  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setMessage('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const handleDeleteAccount = async () => {
  if (!confirm('Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted.')) {
    return;
  }

  if (!confirm('This is your last warning. Delete account and ALL data permanently?')) {
    return;
  }

  try {
    // Request account deletion - this will trigger data cleanup
    const { error } = await supabase.rpc('delete_current_user');
    
    if (error) throw error;

    await signOut();
    alert('Your account has been permanently deleted.');
  } catch (error) {
    console.error('Error deleting account:', error);
    
    // Fallback: Just delete data and sign out
    const { error: deleteError } = await supabase
      .from('activities')
      .delete()
      .eq('user_id', user?.id);

    await signOut();
    alert('Your data has been deleted and you have been signed out. Please contact support to fully remove your account.');
  }
};

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-800 text-slate-100 sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Account Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Account Info */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-200">Account Information</h3>
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
              <div className="text-sm text-slate-400">Email</div>
              <div className="text-slate-200 font-medium">{user?.email}</div>
            </div>
          </div>

          {/* Change Password */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-200">Change Password</h3>
            <form onSubmit={handleChangePassword} className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="bg-slate-950 border-slate-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="bg-slate-950 border-slate-700"
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {message && (
                <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-3 text-green-400 text-sm">
                  {message}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading || !newPassword || !confirmPassword}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </Button>
            </form>
          </div>

          {/* Danger Zone */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h3 className="text-lg font-semibold text-slate-200">Danger Zone</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                onClick={signOut}
                className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                Sign Out
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                Delete Account & All Data
              </Button>
            </div>
          </div>
        </div>
       

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}