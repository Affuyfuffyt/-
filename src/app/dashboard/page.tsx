'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase/auth/use-user';
import { auth } from '@/firebase';

export default function DashboardPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center bg-background p-4 text-center">
      <div className="bg-card p-8 sm:p-12 rounded-2xl shadow-2xl border border-border">
        <h1 className="text-5xl sm:text-7xl font-bold text-primary animate-pulse">Bodi</h1>
        <p className="mt-6 text-2xl sm:text-3xl text-foreground">
          مرحباً بك في <span className="font-semibold text-primary/90">{user.displayName || user.email || 'المستخدم'}</span>
        </p>
        <p className="mt-2 text-muted-foreground">
          يسعدنا انضمامك إلينا!
        </p>
        <button
          onClick={handleSignOut}
          className="mt-8 w-full bg-destructive text-destructive-foreground font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-destructive/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card focus:ring-destructive transition-transform transform hover:scale-105"
        >
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
}
