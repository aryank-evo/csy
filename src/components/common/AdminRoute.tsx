"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const userDataStr = localStorage.getItem('userData');
        
        if (!token || !userDataStr) {
          toast.error("Please login first");
          router.push('/');
          // Open login modal if possible, but redirecting to home is safer for now
          // Alternatively, we could trigger the login modal via a custom event or context
          return;
        }

        const userData = JSON.parse(userDataStr);
        if (!userData.isAdmin) {
          toast.error("Access denied. Admin privileges required.");
          router.push('/');
          return;
        }

        setAuthorized(true);
      } catch (error) {
        console.error("Auth check error:", error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return authorized ? <>{children}</> : null;
};

export default AdminRoute;
