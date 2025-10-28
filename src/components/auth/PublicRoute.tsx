import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';

interface PublicRouteProps {
    children: ReactNode;
    /** Where to redirect if user is authenticated (default: /) */
    redirectTo?: string;
}

const PublicRoute = ({ children, redirectTo = '/' }: PublicRouteProps) => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    // If user is authenticated, redirect them to home or specified route
    if (isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    // User is not authenticated, show the public route
    return <>{children}</>;
};

export default PublicRoute;
