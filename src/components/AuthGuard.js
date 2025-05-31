'use client';
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const publicRoutes = [
    '/signin',
    '/signup',
    '/verify-code',
    '/forgot-password',
];

export default function AuthGuard({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    
    const isPublicRoute = publicRoutes.includes(pathname);

    useEffect(() => {
        // Only redirect if we're sure the user is unauthenticated (not loading)
        if (status === 'unauthenticated' && !isPublicRoute) {
            router.push('/signin');
        }else if (status === 'authenticated' && isPublicRoute) {
            router.refresh();
        }
    }, [status, isPublicRoute, router]);

    // Show loading for protected routes while checking authentication
    if (status === 'loading' && !isPublicRoute) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    // Don't render anything while redirecting unauthenticated users
    if (status === 'unauthenticated' && !isPublicRoute) {
        return null;
    }

    if (status === 'authenticated' && isPublicRoute) {
        return null;
    }

    return children;
}