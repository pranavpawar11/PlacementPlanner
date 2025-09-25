// hooks/useAuthManager.js - Authentication manager with toast and confirm integration
import { useCallback } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useUI } from '../context/UIProvider';

export const useAuthManager = () => {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    error, 
    login: authLogin, 
    signup: authSignup, 
    logout: authLogout, 
    clearError 
  } = useAuth();
  
  const { toast, confirm } = useUI();

  // Enhanced login with better UX
  const login = useCallback(async (credentials) => {
    try {
      // Show loading toast
      const loadingToastId = toast.loading('Signing you in...');

      const result = await authLogin(credentials);
      
      // Dismiss loading toast
      toast.dismiss(loadingToastId);

      if (result.success) {
        // Show success toast
        toast.success(`Welcome back, ${result.user.name}!`, {
          message: 'You have been successfully signed in',
          duration: 4000
        });
        return result;
      } else {
        // Show error toast
        toast.error('Sign in failed', {
          message: result.error || 'Invalid credentials provided',
          duration: 5000
        });
        return result;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Sign in error', {
        message: 'An unexpected error occurred during sign in',
        duration: 5000
      });
      return { success: false, error: error.message };
    }
  }, [authLogin, toast]);

  // Enhanced signup with better UX
  const signup = useCallback(async (userData) => {
    try {
      // Show loading toast
      const loadingToastId = toast.loading('Creating your account...');

      const result = await authSignup(userData);
      
      // Dismiss loading toast
      toast.dismiss(loadingToastId);

      if (result.success) {
        // Show success toast
        toast.success(`Account created successfully!`, {
          message: `Welcome to PlaceMate, ${result.user.name}!`,
          duration: 5000
        });
        return result;
      } else {
        // Show error toast
        toast.error('Account creation failed', {
          message: result.error || 'Unable to create account',
          duration: 5000
        });
        return result;
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Registration error', {
        message: 'An unexpected error occurred during registration',
        duration: 5000
      });
      return { success: false, error: error.message };
    }
  }, [authSignup, toast]);

  // Enhanced logout with confirmation
  const logout = useCallback(async (showConfirmation = true) => {
    try {
      let shouldLogout = true;

      // Show confirmation dialog if requested
      if (showConfirmation) {
        shouldLogout = await confirm.custom({
          title: 'Sign Out',
          message: 'Are you sure you want to sign out of your account?',
          confirmText: 'Sign Out',
          cancelText: 'Stay Signed In',
          type: 'warning'
        });
      }

      if (!shouldLogout) {
        return { success: false, cancelled: true };
      }

      // Show loading toast
      const loadingToastId = toast.loading('Signing you out...');

      const result = await authLogout();
      
      // Dismiss loading toast
      toast.dismiss(loadingToastId);

      if (result.success) {
        // Show success toast
        toast.success('Signed out successfully', {
          message: 'You have been safely signed out',
          duration: 3000
        });
        return result;
      } else {
        // Show error toast
        toast.error('Sign out failed', {
          message: result.error || 'Unable to sign out properly',
          duration: 4000
        });
        return result;
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Sign out error', {
        message: 'An unexpected error occurred during sign out',
        duration: 4000
      });
      return { success: false, error: error.message };
    }
  }, [authLogout, toast, confirm]);

  // Quick logout without confirmation (for emergency/force logout)
  const forceLogout = useCallback(async () => {
    return await logout(false);
  }, [logout]);

  // Clear authentication errors with toast
  const clearAuthError = useCallback(() => {
    clearError();
    // toast.info('Error cleared', {
    //   duration: 2000
    // });
  }, [clearError, toast]);

  // Check if user session is valid
  const validateSession = useCallback(async () => {
    try {
      // In a real app, this would call an API to validate the token
      const storedAuth = localStorage.getItem('placemate_auth');
      
      if (!storedAuth) {
        toast.warning('Session expired', {
          message: 'Please sign in again to continue',
          duration: 4000
        });
        return false;
      }

      const authData = JSON.parse(storedAuth);
      const tokenAge = Date.now() - parseInt(authData.token.split('_')[2]);
      const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days

      if (tokenAge > maxAge) {
        toast.warning('Session expired', {
          message: 'Your session has expired. Please sign in again',
          duration: 5000
        });
        await forceLogout();
        return false;
      }

      return true;
    } catch (error) {
      console.error('Session validation error:', error);
      toast.error('Session validation failed', {
        message: 'Unable to verify your session',
        duration: 4000
      });
      return false;
    }
  }, [toast, forceLogout]);

  // Update user profile (placeholder for future implementation)
  const updateProfile = useCallback(async (profileData) => {
    try {
      // Show confirmation for sensitive changes
      if (profileData.email || profileData.phone || profileData.password) {
        const confirmed = await confirm.custom({
          title: 'Update Profile',
          message: 'You are updating sensitive account information. Continue?',
          confirmText: 'Update Profile',
          cancelText: 'Cancel Changes',
          type: 'warning'
        });

        if (!confirmed) {
          return { success: false, cancelled: true };
        }
      }

      // Show loading toast
      const loadingToastId = toast.loading('Updating your profile...');

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.dismiss(loadingToastId);

      // Show success toast
      toast.success('Profile updated successfully!', {
        message: 'Your changes have been saved',
        duration: 4000
      });

      return { success: true };
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Profile update failed', {
        message: 'Unable to save your changes',
        duration: 4000
      });
      return { success: false, error: error.message };
    }
  }, [toast, confirm]);

  // Change password with enhanced security
  const changePassword = useCallback(async (currentPassword, newPassword) => {
    try {
      // Show confirmation
      const confirmed = await confirm.custom({
        title: 'Change Password',
        message: 'Are you sure you want to change your password? You will need to use the new password for future sign-ins.',
        confirmText: 'Change Password',
        cancelText: 'Keep Current Password',
        type: 'warning'
      });

      if (!confirmed) {
        return { success: false, cancelled: true };
      }

      // Show loading toast
      const loadingToastId = toast.loading('Changing your password...');

      // Simulate password validation and change
      await new Promise(resolve => setTimeout(resolve, 1200));

      toast.dismiss(loadingToastId);

      // Show success toast
      toast.success('Password changed successfully!', {
        message: 'Your account is now secured with the new password',
        duration: 5000
      });

      return { success: true };
    } catch (error) {
      console.error('Password change error:', error);
      toast.error('Password change failed', {
        message: 'Unable to update your password',
        duration: 4000
      });
      return { success: false, error: error.message };
    }
  }, [toast, confirm]);

  // Delete account with strong confirmation
  const deleteAccount = useCallback(async () => {
    try {
      // First confirmation
      const firstConfirm = await confirm.delete(
        'Delete Account',
        'This action cannot be undone. All your data will be permanently deleted.'
      );

      if (!firstConfirm) {
        return { success: false, cancelled: true };
      }

      // Second confirmation for safety
      const finalConfirm = await confirm.custom({
        title: 'Final Confirmation',
        message: 'Type "DELETE" to confirm account deletion',
        confirmText: 'Delete Forever',
        cancelText: 'Cancel',
        type: 'danger',
        requireTextConfirmation: 'DELETE'
      });

      if (!finalConfirm) {
        return { success: false, cancelled: true };
      }

      // Show loading toast
      const loadingToastId = toast.loading('Deleting your account...');

      // Simulate account deletion
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.dismiss(loadingToastId);

      // Show final toast
      toast.success('Account deleted', {
        message: 'Your account and all data have been removed',
        duration: 4000
      });

      // Force logout after deletion
      await forceLogout();

      return { success: true };
    } catch (error) {
      console.error('Account deletion error:', error);
      toast.error('Account deletion failed', {
        message: 'Unable to delete your account',
        duration: 4000
      });
      return { success: false, error: error.message };
    }
  }, [toast, confirm, forceLogout]);

  // Get user stats and info
  const getUserInfo = useCallback(() => {
    if (!user) return null;

    const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const lastLoginDate = new Date(user.lastLogin).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    return {
      ...user,
      memberSince,
      lastLoginDate,
      initials: user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U'
    };
  }, [user]);

  return {
    // Auth state
    user,
    isAuthenticated,
    isLoading,
    error,
    
    // Enhanced auth methods
    login,
    signup,
    logout,
    forceLogout,
    
    // Utility methods
    clearAuthError,
    validateSession,
    getUserInfo,
    
    // Profile management (for future implementation)
    updateProfile,
    changePassword,
    deleteAccount,
    
    // Computed values
    isLoggedIn: isAuthenticated,
    userRole: user?.role || 'user',
    userName: user?.name || 'User',
    userEmail: user?.email || '',
    userInitials: user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U'
  };
};

export default useAuthManager;