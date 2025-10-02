'use client';

import React, { ReactNode } from 'react';
import { FirebaseProvider } from './provider';
import { app, auth, firestore } from './index';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  return (
    <FirebaseProvider app={app} auth={auth} firestore={firestore}>
      {children}
    </FirebaseProvider>
  );
}
