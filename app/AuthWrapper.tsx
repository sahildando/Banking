"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getLoggedInUser } from "@/lib/actions/user.actions";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    let isAuthenticated: boolean = false;

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/sign-in');
        } else if (isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router]);

    return <>{children}</>;
};

export default AuthWrapper;
