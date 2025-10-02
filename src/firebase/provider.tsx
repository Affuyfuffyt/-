'use client';

import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

interface FirebaseContextType {
  app: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
}

const FirebaseContext = createContext<FirebaseContextType>({
  app: null,
  auth: null,
  firestore: null,
});

interface FirebaseProviderProps {
  children: ReactNode;
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}

export function FirebaseProvider({
  children,
  app,
  auth,
  firestore,
}: FirebaseProviderProps) {
  const value = useMemo(() => ({ app, auth, firestore }), [app, auth, firestore]);
  return (
    <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>
  );
}

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

export const useFirebaseApp = () => useFirebase().app;
export const useAuth = () => useFirebase().auth;
export const useFirestore = () => useFirebase().firestore;
