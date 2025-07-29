'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface AuthRedirectProps {
  requireAuth?: boolean; // true for dashboard, false for auth page
}

const AuthRedirect: React.FC<AuthRedirectProps> = ({ requireAuth = false }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        // User needs to be authenticated but isn't - redirect to auth
        setShouldRedirect(true);
        router.push('/auth');
      } else if (!requireAuth && user) {
        // User is authenticated but on auth page - redirect to dashboard
        setShouldRedirect(true);
        router.push('/dashboard');
      }
    }
  }, [user, loading, requireAuth, router]);

  // Don't render anything if we're redirecting to prevent hydration issues
  if (shouldRedirect) {
    return null;
  }

  // Show loading while checking auth status
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  return null;
};

export default AuthRedirect; 