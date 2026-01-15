'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getLocalStorageItem } from '@/utils/localstorage';

interface AdminDashboardWrapperProps {
  children: React.ReactNode;
}

const AdminDashboardWrapper = ({ children }: AdminDashboardWrapperProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAdminAuth = () => {
      try {
        // Check if user is logged in and has admin privileges
        const token = getLocalStorageItem('token');
        const userData = getLocalStorageItem('userData');
        
        if (!token || !userData) {
          router.push('/login');
          return;
        }

        const user = JSON.parse(userData);
        if (!user.isAdmin) {
          // Redirect to regular dashboard or homepage if not admin
          router.push('/');
          return;
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error('Error checking admin auth:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
};

export default AdminDashboardWrapper;