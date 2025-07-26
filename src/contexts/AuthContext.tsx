import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService, IUser } from '../api/services/auth.service';
import { useRouter } from 'next/router';

interface AuthContextType {
  user: IUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  // Initialize auth state
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuthenticated = await authService.checkAuth();
        if (isAuthenticated) {
          const currentUser = authService.getCurrentUser();
          setUser(currentUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { user } = await authService.login(email, password);
      setUser(user);
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return { 
        success: false, 
        error: error?.response?.data?.message || 'Login failed. Please check your credentials.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      // Redirect to home or login page after logout
      router.push('/login');
    }
  };

  const refreshUser = async () => {
    try {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Failed to refresh user:', error);
      setUser(null);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isLoading,
    login,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Higher Order Component for protecting routes
export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: { redirectTo?: string; adminOnly?: boolean } = {}
) => {
  const { redirectTo = '/login', adminOnly = false } = options;
  
  const WithAuth: React.FC<P> = (props) => {
    const { isAuthenticated, isAdmin, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        // Redirect to login if not authenticated
        router.push(redirectTo);
      } else if (!isLoading && adminOnly && !isAdmin) {
        // Redirect to home or unauthorized page if not admin
        router.push('/');
      }
    }, [isAuthenticated, isAdmin, isLoading, router]);

    if (isLoading) {
      return <div>Loading...</div>; // Or your custom loading component
    }

    if (!isAuthenticated || (adminOnly && !isAdmin)) {
      return null; // Or a loading/unauthorized component
    }

    return <WrappedComponent {...(props as P)} />;
  };

  return WithAuth;
};
